import fs from 'fs';
import path from 'path';
import { JobOpening } from '../../../lib/types';

import { prettierFormat } from '../../prettier';
import { companies } from '../constants';
import { getLeverJobOpenings } from './helpers/getLeverJobOpenings';

const companyName = 'BukuWarung';
const company = companies.find((c) => c.name === companyName);

export const getJobOpenings = async (): Promise<JobOpening[]> => {
  if (!company) return [];

  const jobOpenings = (await getLeverJobOpenings(company, 'bukuwarung'))
    .filter((job) => job.location === 'Remote' || job.location === 'Jakarta')
    .filter(
      (job) =>
        job.departmentName === 'Engineering' ||
        job.departmentName === 'Product, Design and Research',
    );
  return jobOpenings;
};

export const scrape = async () => {
  if (!company) return;

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
