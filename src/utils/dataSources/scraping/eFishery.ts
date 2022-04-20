import fs from 'fs';
import path from 'path';
import fetch from 'isomorphic-unfetch';
import * as cheerio from 'cheerio';

import { JobOpening } from '../../../lib/types';
import { prettierFormat } from '../../prettier';
import { companies } from '../constants';

const companyName = 'eFishery';
const company = companies.find((c) => c.name === companyName);

export const getJobOpenings = async (): Promise<JobOpening[]> => {
  if (!company) return [];

  const response = await fetch('https://efishery.com/en/job-search/');
  const html = await response.text();
  const $ = cheerio.load(html);

  const jobOpenings: JobOpening[] = [];

  $('.item.technology-data').each((_, element) => {
    const jobOpening: JobOpening = {
      company: companyName,
      departmentName: $('li:nth-child(2)', element).text().trim(),
      description: '',
      url: $('figure > a', element).attr('href') || company.jobOpeningsUrl,
      jobTitle: $('h4', element).text().trim(),
      location: '',
    };

    jobOpenings.push(jobOpening);
  });

  return jobOpenings;
};

export const scrape = async () => {
  if (!company) return;

  const jobOpenings: JobOpening[] = await getJobOpenings();

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
