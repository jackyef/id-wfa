import clsx from 'clsx';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Error from 'next/error';
import { ParsedUrlQuery } from 'querystring';
import { JobOpening } from '../../lib/types';
import { companies } from '../../utils/dataSources/constants';
import { db } from '../../utils/dataSources/db';

type Props = {
  jobs: JobOpening[];
  companyName: string;
  errorCode: number | null;
};

interface Params extends ParsedUrlQuery {
  companySafeName: string;
}

const CompanyJobsPage: NextPage<Props> = ({ errorCode, jobs, companyName }) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  return (
    <div>
      List of job of the company: {companyName}
      <ul>
        {jobs.map((job) => (
          <li
            key={job.jobTitle}
            className={clsx(
              'pl-4',
              'text-purple-600',
              'hover:text-purple-500',
              'hover:underline',
            )}
          >
            <a href={job.url}>{job.jobTitle}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = companies.map((company) => ({
    params: {
      companySafeName: (company.safeName || company.name).toLowerCase(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (ctx) => {
  const { companySafeName } = ctx.params!;
  const companyJobs = await db.getJobsByCompanyLazily(companySafeName);
  let errorCode = null;

  if (!companyJobs || !companyJobs.length) {
    errorCode = 404;
  }

  return {
    props: {
      companySafeName,
      companyName: companyJobs[0].company,
      jobs: companyJobs,
      errorCode,
    },
    revalidate: 3600 * 24, // Revalidates at most every 24 hours
  };
};

export default CompanyJobsPage;
