import fs from 'fs';
import path from 'path';
import fetch from 'isomorphic-unfetch';
import * as cheerio from 'cheerio';

import { JobOpening } from '../../../lib/types';
import { prettierFormat } from './prettier';

const companyName = 'CoLearn';

export const scrape = async () => {
  const response = await fetch('https://boards.greenhouse.io/colearn');
  const html = await response.text();
  const $ = cheerio.load(html);

  const jobOpenings: JobOpening[] = [];

  $('section.level-0').each((_, element) => {
    const category = $('h3', element).text().trim();
    const jobNodes = $('.opening', element);

    jobNodes.each((_, jobNode) => {
      const location = $('.location', jobNode).text();

      if (!location.includes('Indonesia')) return;

      const jobTitle = $('a', jobNode).text();
      const url = `https://boards.greenhouse.io/${$('a', jobNode).attr(
        'href',
      )}`;

      const jobOpening: JobOpening = {
        company: companyName,
        departmentName: category,
        description: '',
        employmentType: 'Full-time',
        url,
        jobTitle,
        location: '',
      };

      jobOpenings.push(jobOpening);
    });
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

scrape();
