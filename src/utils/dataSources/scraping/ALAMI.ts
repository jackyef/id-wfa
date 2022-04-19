import fs from 'fs';
import path from 'path';

import { prettierFormat } from '../../prettier';
import { companies } from '../constants';
import { getLeverJobOpenings } from './helpers/getLeverJobOpenings';

const companyName = 'ALAMI';
const company = companies.find((c) => c.name === companyName);

export const scrape = async () => {
  if (!company) return;

  const jobOpenings = (await getLeverJobOpenings(company, 'alamigroup')).filter(
    (job) => job.jobTitle.includes('Remote'),
  );

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
