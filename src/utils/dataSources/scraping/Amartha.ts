import fs from 'fs';
import path from 'path';
import fetch from 'isomorphic-unfetch';

import { JobOpening } from '../../../lib/types';
import { prettierFormat } from '../../prettier';
import {
  convertWorkableJobEntries,
  WorkableJobEntry,
} from './helpers/convertWorkableJobEntries';

const companyName = 'Amartha';

export const getJobOpenings = async (): Promise<JobOpening[]> => {
  const response = await fetch(
    'https://apply.workable.com/api/v3/accounts/amartha/jobs',
    {
      headers: {
        accept: 'application/json, text/plain, */*',
        'accept-language': 'en',
        'content-type': 'application/json;charset=UTF-8',
        Referer: 'https://apply.workable.com/amartha/',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
      body: '{"query":"","location":[],"department":[],"worktype":[],"remote":[true]}',
      method: 'POST',
    },
  );

  const json = await response.json();
  const jobEntries = json.results as WorkableJobEntry[];

  const jobOpenings: JobOpening[] = jobEntries
    .map((job) => {
      return convertWorkableJobEntries(job, companyName);
    })
    .filter((job) => Boolean(job.departmentName));

  return jobOpenings;
};

export const scrape = async () => {
  const jobOpenings = await getJobOpenings();
  const output = prettierFormat(
    `
  import { JobOpening } from '../../../../lib/types'

  export const ${companyName}_JOBS: JobOpening[] = ${JSON.stringify(
      jobOpenings,
    )}
`,
  );

  fs.writeFileSync(path.join(__dirname, 'static', `${companyName}.ts`), output);
};
