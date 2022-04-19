import fs from 'fs';
import path from 'path';
import fetch from 'isomorphic-unfetch';
import * as cheerio from 'cheerio';

import { JobOpening } from '../../../lib/types';
import { prettierFormat } from '../../prettier';
import { companies } from '../constants';

const companyName = 'Finantier';
const company = companies.find((c) => c.name === companyName);

export const scrape = async () => {
  if (!company) return;

  const response = await fetch(
    'https://jobs.lever.co/Finantier/?location=Remote',
  );
  const html = await response.text();
  const $ = cheerio.load(html);

  const jobOpenings: JobOpening[] = [];

  $('.postings-group').each((_, element) => {
    const category = $('.large-category-header', element).text().trim();

    $('.posting', element).each((_, jobPostingNode) => {
      const linkNode = $('a.posting-title', jobPostingNode);
      const jobTitle = $('h5', linkNode).text().trim();
      const url = linkNode.attr('href') || company.jobOpeningsUrl;

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
