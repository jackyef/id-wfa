import fs from 'fs';
import path from 'path';
import fetch from 'isomorphic-unfetch';

import { prettierFormat } from '../../prettier';
import { companies } from '../constants';

type StockbitJobEntry = {
  id: string;
  shortcode: string;
  title: string;
  remote: boolean;
  location: {
    country: string;
  };
  published: string;
  department: string[];
};

const companyName = 'Stockbit/Bibit';
const company = companies.find((c) => c.name === companyName);

export const scrape = async () => {
  if (!company) return;

  const response = await fetch(
    'https://apply.workable.com/api/v3/accounts/stockbit/jobs',
    {
      method: 'POST',
    },
  );
  const json = await response.json();
  const jobEntries = json.results as StockbitJobEntry[];

  const jobOpenings = jobEntries
    .map((job) => {
      if (job.location.country !== 'Indonesia') return;
      if (!job.remote) return;

      return {
        company: company.name,
        departmentName: job.department[0],
        jobTitle: job.title,
        url: `https://apply.workable.com/stockbit/j/${job.shortcode}`,
        location: job.location.country,
        publishedAt: new Date(job.published).toISOString(),
      };
    })
    .filter(Boolean);

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
