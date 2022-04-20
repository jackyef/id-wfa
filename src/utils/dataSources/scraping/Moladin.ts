import fs from 'fs';
import path from 'path';
import fetch from 'isomorphic-unfetch';

import { JobOpening } from '../../../lib/types';
import { prettierFormat } from '../../prettier';

type MoladinJobOpening = {
  id: string;
  name: string;
  departmentName: string;
  jobLocationName: string;
  createdAt: string; // ISO date string
};

const companyName = 'Moladin';

export const getJobOpenings = async (): Promise<JobOpening[]> => {
  const response = await fetch(
    'https://backend-career-site.production.jinny.id/jobs/?page=1&per_page=10&sort=created_date|desc&department_id=&job_location_id=2&job_type_id=&search=',
  );

  const json: MoladinJobOpening[] = await response.json();

  const jobOpenings: JobOpening[] = json.map((job) => {
    return {
      company: companyName,
      departmentName: job.departmentName,
      description: '',
      url: `https://moladin.com/careers/${job.id}-${job.name.replace(
        / /g,
        '-',
      )}`,
      jobTitle: job.name,
      location: job.jobLocationName,
      publishedAt: new Date(job.createdAt).toISOString(),
    };
  });

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
