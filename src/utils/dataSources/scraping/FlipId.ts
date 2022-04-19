import fs from 'fs';
import path from 'path';
import fetch from 'isomorphic-unfetch';
import * as cheerio from 'cheerio';

import { JobOpening } from '../../../lib/types';
import { prettierFormat } from '../../prettier';
import { companies } from '../constants';

const companyName = 'Flip.id';
const company = companies.find((c) => c.name === companyName);

export const scrape = async () => {
  if (!company) return;

  const response = await fetch(
    'https://career.flip.id/jobs?location=[]&department=[]&jobType=[]&title=&isRemoteLocation=true',
  );
  const html = await response.text();
  const $ = cheerio.load(html);

  const jobOpenings: JobOpening[] = [];

  $('li').each((_, element) => {
    const headingElement = $('h5', element);

    // Remove the <span> inside the heading
    $('span', headingElement).remove();

    const category = headingElement.text().trim();

    $('.job-list', element).each((_, jobList) => {
      $('a', jobList).each((_, jobLink) => {
        const jobTitle = $('.job-title', jobLink).text();
        const jobUrl = $(jobLink).attr('href');
        const url = jobUrl
          ? `https://career.flip.id${jobUrl}`
          : company.jobOpeningsUrl;

        const jobOpening: JobOpening = {
          company: companyName,
          departmentName: category,
          description: '',
          employmentType: 'Full-time',
          url,
          jobTitle,
          location: 'Remote',
        };

        jobOpenings.push(jobOpening);
      });
    });
  });

  const safeCompanyName = 'FlipId';

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
