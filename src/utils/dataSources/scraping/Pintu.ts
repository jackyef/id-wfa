import fs from 'fs';
import path from 'path';
import fetch from 'isomorphic-unfetch';
import * as cheerio from 'cheerio';

import { JobOpening } from '../../../lib/types';
import { prettierFormat } from '../../prettier';
import { companies } from '../constants';

const companyName = 'Pintu';
const company = companies.find((c) => c.name === companyName);

export const getJobOpenings = async (): Promise<JobOpening[]> => {
  if (!company) return [];

  const response = await fetch(
    'https://careers.pintu.co.id/jobs?remote_status_id=fully',
  );
  const html = await response.text();
  const $ = cheerio.load(html);

  const jobOpenings: JobOpening[] = [];

  $('li').each((_, element) => {
    const link = $('a', element);
    const url = link.attr('href') ?? company.jobOpeningsUrl;
    const jobTitle = $('a > span:nth-child(1)', element).text();
    const departmentName = $('div > span:nth-child(1)', link).text();

    const jobOpening: JobOpening = {
      company: companyName,
      departmentName,
      description: '',
      url,
      jobTitle,
      location: 'Remote',
    };

    jobOpenings.push(jobOpening);
  });

  return jobOpenings.filter((job) =>
    Boolean(job.departmentName && job.jobTitle && job.url),
  );
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
