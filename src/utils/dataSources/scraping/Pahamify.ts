import fs from 'fs';
import path from 'path';
import fetch from 'isomorphic-unfetch';
import * as cheerio from 'cheerio';

import { JobOpening } from '../../../lib/types';
import { prettierFormat } from '../../prettier';
import { companies } from '../constants';

const companyName = 'Pahamify';
const company = companies.find((c) => c.name === companyName);

export const getJobOpenings = async (): Promise<JobOpening[]> => {
  if (!company || !company.jobOpeningsFeedUrl) return [];

  const response = await fetch(company.jobOpeningsFeedUrl);
  const xml = await response.text();
  const $ = cheerio.load(xml, {
    xml: true,
  });

  const jobOpenings: JobOpening[] = [];

  $('item').each((_, element) => {
    const category = $('category', element).first().text().trim(); // Only take the first category
    const jobTitle = $('title', element).text();
    const url = $('link', element).text();

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

  return jobOpenings;
};

export const scrape = async () => {
  if (!company || !company.jobOpeningsFeedUrl) return;

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
