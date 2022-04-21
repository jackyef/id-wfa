import fs from 'fs';
import path from 'path';
import fetch from 'isomorphic-unfetch';

import { prettierFormat } from '../../prettier';
import { companies } from '../constants';
import { JobOpening } from '../../../lib/types';

import { getLeverJobOpenings } from './helpers/getLeverJobOpenings';

const companyName = 'Stockbit/Bibit';
const company = companies.find((c) => c.name === companyName);

export const getJobOpenings = async (): Promise<JobOpening[]> => {
  if (!company) return [];

  const jobOpenings = await getLeverJobOpenings(company, 'ruangguru', {
    department: 'Engineering & Data',
  });

  return jobOpenings;
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
