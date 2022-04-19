import { Company, JobOpening } from '../../lib/types';
import { companies } from './constants';

type CompanyWithJobs = Company & {
  jobs?: JobOpening[];
};

type JobDataSource = CompanyWithJobs[];

const initDataSource = () => {
  const inMemoryDb: JobDataSource = [...companies];

  for (let i = 0; i < inMemoryDb.length; i += 1) {
    const company = inMemoryDb[i];
    company.jobs = require(`./scraping/static/${company.safeName}.ts`)[
      `${company.safeName}_JOBS`
    ];
  }

  return inMemoryDb;
};

const dataSource = initDataSource();

// Not really a performant db, but this will do for now
// We will be using this in getStaticProps
export const db = {
  getJobsByCompany: (companyName: string) => {
    return dataSource.find((c) => c.name === companyName)?.jobs ?? [];
  },
  getCompanies: () => companies,
  searchJobs: (query: string) => {
    const results = [];

    return dataSource.forEach((c) =>
      c.jobs?.forEach((j) => {
        if (j.jobTitle.toLowerCase().includes(query.toLowerCase())) {
          results.push(j);
        }
      }),
    );
  },
};
