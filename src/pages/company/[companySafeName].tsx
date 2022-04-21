import clsx from 'clsx';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Error from 'next/error';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { Footer } from '../../components/Footer';
import { JobList } from '../../components/JobList/JobList';
import { MetaTags } from '../../components/MetaTags/MetaTags';
import { Flip } from '../../lib/flip/react';
import { Company, JobOpening } from '../../lib/types';
import { companies } from '../../utils/dataSources/constants';
import { db } from '../../utils/dataSources/db';

const FancyBackground = () => {
  return (
    <>
      <div
        className={clsx('fancyBackground', 'absolute', 'inset-0', '-z-10')}
      />
      <Container>
        <Link href="/" passHref>
          <a
            className={clsx('-m-2', 'text-2xl', 'text-white', 'font-bold')}
            aria-label="Back to homepage"
          >
            <span aria-hidden>id-WFA 🇮🇩</span>
          </a>
        </Link>
      </Container>
      <style jsx>{`
        .fancyBackground {
          background-color: #b499ff;
          background-image: radial-gradient(
              at 70% 27%,
              hsla(289, 70%, 61%, 1) 0px,
              transparent 50%
            ),
            radial-gradient(
              at 96% 27%,
              hsla(296, 61%, 77%, 1) 0px,
              transparent 50%
            ),
            radial-gradient(
              at 99% 41%,
              hsla(288, 98%, 67%, 1) 0px,
              transparent 50%
            ),
            radial-gradient(
              at 54% 76%,
              hsla(315, 61%, 77%, 1) 0px,
              transparent 50%
            ),
            radial-gradient(
              at 60% 24%,
              hsla(189, 68%, 65%, 1) 0px,
              transparent 50%
            ),
            radial-gradient(
              at 86% 97%,
              hsla(263, 65%, 62%, 1) 0px,
              transparent 50%
            ),
            radial-gradient(
              at 64% 48%,
              hsla(122, 98%, 75%, 1) 0px,
              transparent 50%
            );
        }
      `}</style>
    </>
  );
};

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={clsx('p-8', 'max-w-6xl', 'mx-auto')}>{children}</div>;
};

type Props = {
  companySafeName: string;
  jobs: JobOpening[];
  company?: Company;
  errorCode: number | null;
};

interface Params extends ParsedUrlQuery {
  companySafeName: string;
}

const CompanyJobsPage: NextPage<Props> = ({
  errorCode,
  jobs,
  company,
  companySafeName,
}) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  const renderInfo = () => {
    if (jobs.length > 0) {
      return (
        <div
          className={clsx(
            'mx-4',
            'p-4',
            'rounded-md',
            'border',
            'border-purple-600',
            'text-purple-800',
            'bg-purple-50',
          )}
        >
          This page scrapes job openings from {company?.name} jobs page. For the
          most up-to-date job openings, please refer to their{' '}
          <a
            className={clsx(
              'underline',
              'underline-offset-2',
              'hover:no-underline',
            )}
            href={company?.jobOpeningsUrl}
            target="_blank"
            rel="noreferrer"
          >
            jobs page
          </a>{' '}
          directly.
        </div>
      );
    } else {
      return (
        <div
          className={clsx(
            'mx-4',
            'p-4',
            'rounded-md',
            'border',
            'border-yellow-600',
            'text-yellow-800',
            'bg-yellow-50',
          )}
        >
          We can&apos;t seem to find jobs for {company?.name} at the moment. Try
          visiting their{' '}
          <a
            className={clsx(
              'underline',
              'underline-offset-2',
              'hover:no-underline',
            )}
            href={company?.jobOpeningsUrl}
            target="_blank"
            rel="noreferrer"
          >
            jobs page
          </a>{' '}
          directly.
        </div>
      );
    }
  };

  return (
    <div>
      <MetaTags
        title={`Indonesian remote-friendly jobs at ${company?.name}`}
        description={`${company?.name} has ~${jobs.length} job openings that allows the employee to work from anywhere.`}
      />
      <div className={clsx('h-72', 'relative', 'overflow-hidden')}>
        <FancyBackground />
      </div>
      <Container>
        <main className="mb-16">
          <Flip id={companySafeName}>
            <div
              className={clsx(
                '-mt-20',
                'md:-mt-28',
                'mb-4',
                'bg-white',
                'inline-block',
                'rounded-full',
                'shadow-inner',
                'shadow-slate-300',
                'p-4',
                '-ml-2',
              )}
            >
              <img
                alt=""
                src={company?.imageUrl}
                loading="lazy"
                className={clsx(
                  'w-20',
                  'h-20',
                  'md:w-32',
                  'md:h-32',
                  'object-contain',
                  'rounded-full',
                )}
              />
            </div>
          </Flip>
          <h2 className={clsx('text-2xl', 'mb-8', 'items-baseline')}>
            {company?.name}

            <span
              className={clsx(
                'ml-2',
                'p-1',
                'text-xs',
                'rounded-md',
                'border',
                'border-cyan-600',
                'text-cyan-800',
                'bg-cyan-50',
              )}
            >
              {jobs.length} openings
            </span>
          </h2>

          <div className="mb-12">{renderInfo()}</div>

          <JobList jobs={jobs} />
        </main>

        <Footer />
      </Container>
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
  const company = db.getCompanyBySafeName(companySafeName);
  let errorCode = null;

  if (!company) {
    errorCode = 404;
  }

  return {
    props: {
      companySafeName,
      company,
      jobs: companyJobs,
      errorCode,
    },
    revalidate: 3600 * 24, // Revalidates at most every 24 hours
  };
};

export default CompanyJobsPage;
