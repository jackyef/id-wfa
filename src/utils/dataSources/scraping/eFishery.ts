import fs from 'fs';
import path from 'path';
import fetch from 'isomorphic-unfetch';
import * as cheerio from 'cheerio';

import { JobOpening } from '../../../lib/types';
import { prettierFormat } from './prettier';

const companyName = 'eFishery';

export const scrape = async () => {
  const response = await fetch('https://efishery.com/en/job-search/');
  const html = await response.text();
  const $ = cheerio.load(html);

  const jobOpenings: JobOpening[] = [];

  $('.item.technology-data').each((_, element) => {
    const jobOpening: JobOpening = {
      company: companyName,
      departmentName: $('li:nth-child(2)', element).text().trim(),
      description: '',
      employmentType:
        $('li:nth-child(1)', element).text().trim() === 'Full-time'
          ? 'Full-time'
          : 'Contract',
      url: $('figure > a', element).attr('href') || '',
      jobTitle: $('h4', element).text().trim(),
      location: '',
    };

    jobOpenings.push(jobOpening);
  });

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
