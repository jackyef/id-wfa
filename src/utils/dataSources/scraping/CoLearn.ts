import fs from 'fs';
import path from 'path';
import fetch from 'isomorphic-unfetch';
import * as cheerio from 'cheerio';

import { JobOpening } from '../../../lib/types';
import { prettierFormat } from '../../prettier';
import { companies } from '../constants';

const companyName = 'CoLearn';
const company = companies.find((c) => c.name === companyName);

export const getJobOpenings = async (): Promise<JobOpening[]> => {
  if (!company) return [];

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
      const jobUrl = $('a', jobNode).attr('href');
      const url = jobUrl
        ? `https://boards.greenhouse.io/${jobUrl}`
        : company.jobOpeningsUrl;

      const jobOpening: JobOpening = {
        company: companyName,
        departmentName: category,
        description: '',
        url,
        jobTitle,
        location: '',
      };

      jobOpenings.push(jobOpening);
    });
  });

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
