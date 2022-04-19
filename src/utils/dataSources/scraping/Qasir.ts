import fs from 'fs';
import path from 'path';
import fetch from 'isomorphic-unfetch';
import * as cheerio from 'cheerio';

import { JobOpening } from '../../../lib/types';
import { prettierFormat } from '../../prettier';
import { companies } from '../constants';

const companyName = 'Qasir.id';
const company = companies.find((c) => c.name === companyName);

export const scrape = async () => {
  if (!company) return;

  const response = await fetch('https://www.qasir.id/career');
  const html = await response.text();
  const $ = cheerio.load(html);

  const jobOpenings: JobOpening[] = [];

  $('div[role="listitem"]').each((_, element) => {
    const jobTitleNode = $('h3', element);
    const category = $('div:nth-child(1)', jobTitleNode.siblings().first())
      .text()
      .trim();

    if (!['Product', 'Technology'].includes(category)) return;

    const jobTitle = jobTitleNode.text().trim();
    const jobUrl = $('a', element).attr('href');
    const url = jobUrl ? `https://qasir.id${jobUrl}` : company.jobOpeningsUrl;

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

  const safeCompanyName = 'Qasir';

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
