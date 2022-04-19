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
    const usedName = company.safeName || company.name;

    company.jobs = require(`./scraping/static/${usedName}.ts`)[
      `${usedName}_JOBS`
    ];
  }

  return inMemoryDb;
};

const dataSource = initDataSource();

// Not really a performant db, but this will do for now
// We will be using this in getStaticProps
export const db = {
  getJobsByCompany: (companySafeName: string) => {
    return (
      dataSource.find(
        (c) =>
          c.safeName?.toLowerCase() === companySafeName.toLowerCase() ||
          c.name.toLowerCase() === companySafeName.toLowerCase(),
      )?.jobs ?? []
    );
  },
  getCompanies: () => companies as Company[],
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
