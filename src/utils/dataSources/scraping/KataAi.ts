import fs from 'fs';
import path from 'path';

import { prettierFormat } from '../../prettier';
import { companies } from '../constants';
import { getSmartRecruitersJobOpenings } from './helpers/getSmartRecruitersJobOpenings';

const companyName = 'Kata.ai';
const company = companies.find((c) => c.name === companyName);

export const scrape = async () => {
  if (!company) return;

  const jobOpenings = await getSmartRecruitersJobOpenings(company, 'Kataai', {
    useFunctionName: true,
  });

  const safeCompanyName = 'KataAi';
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
