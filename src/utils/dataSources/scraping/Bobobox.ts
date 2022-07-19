import fs from 'fs';
import path from 'path';
import fetch from 'isomorphic-unfetch';

import { prettierFormat } from '../../prettier';
import { companies } from '../constants';
import { JobOpening } from '../../../lib/types';
import {
  convertGlintsJobEntries,
  GlintsJobEntry,
} from './helpers/convertGlintsJobEntries';

const companyName = 'Bobobox';
const company = companies.find((c) => c.name === companyName);

export const getJobOpenings = async (): Promise<JobOpening[]> => {
  if (!company) return [];

  const response = await fetch('https://glints.com/api/graphql', {
    headers: {
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.9,id;q=0.8',
      'content-type': 'application/json',
      Referer:
        'https://glints.com/id/en/opportunities/jobs/explore?jobCategories=1%2C3&companies=00e32ac6-95b0-4723-8dc2-f3a32f1d884d',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
    body: '{"operationName":"searchJobs","variables":{"data":{"CompanyId":["00e32ac6-95b0-4723-8dc2-f3a32f1d884d"],"JobCategoryId":[1,3],"limit":30,"offset":0,"prioritiseHotJobs":true,"includeExternalJobs":true,"sources":["NATIVE","SUPER_POWERED"]}},"query":"query searchJobs($data: JobSearchConditionInput!) {\\n  searchJobs(data: $data) {\\n    jobsInPage {\\n      id\\n      title\\n      isRemote\\n      status\\n      createdAt\\n      isActivelyHiring\\n      isHot\\n      salaryEstimate {\\n        minAmount\\n        maxAmount\\n        CurrencyCode\\n        __typename\\n      }\\n      company {\\n        ...CompanyFields\\n        __typename\\n      }\\n      citySubDivision {\\n        id\\n        name\\n        __typename\\n      }\\n      city {\\n        ...CityFields\\n        __typename\\n      }\\n      country {\\n        ...CountryFields\\n        __typename\\n      }\\n      category {\\n        id\\n        name\\n        __typename\\n      }\\n      salaries {\\n        ...SalaryFields\\n        __typename\\n      }\\n      minYearsOfExperience\\n      maxYearsOfExperience\\n      source\\n      __typename\\n    }\\n    totalJobs\\n    __typename\\n  }\\n}\\n\\nfragment CompanyFields on Company {\\n  id\\n  name\\n  logo\\n  __typename\\n}\\n\\nfragment CityFields on City {\\n  id\\n  name\\n  __typename\\n}\\n\\nfragment CountryFields on Country {\\n  code\\n  name\\n  __typename\\n}\\n\\nfragment SalaryFields on JobSalary {\\n  id\\n  salaryType\\n  salaryMode\\n  maxAmount\\n  minAmount\\n  CurrencyCode\\n  __typename\\n}\\n"}',
    method: 'POST',
  });
  const json = await response.json();
  const jobEntries = json.data.searchJobs.jobsInPage as GlintsJobEntry[];

  const jobOpenings = jobEntries.map((job) => {
    return convertGlintsJobEntries(job, company.name);
  });

  return jobOpenings.filter(Boolean) as JobOpening[];
};

export const scrape = async () => {
  if (!company) return;

  const jobOpenings = await getJobOpenings();

  const safeCompanyName = company.safeName;
  const output = prettierFormat(
    `
    import { JobOpening } from '../../../../lib/types'

    export const ${safeCompanyName}_JOBS: JobOpening[] = ${JSON.stringify(
      jobOpenings,
    )}
  `,
  );

  fs.writeFileSync(
    path.join(__dirname, 'static', `${safeCompanyName}.ts`),
    output,
  );
};
