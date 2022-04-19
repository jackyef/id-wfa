import fs from 'fs';
import path from 'path';
import fetch from 'isomorphic-unfetch';

import { prettierFormat } from '../../prettier';
import { companies } from '../constants';

type SmartRecruiterJobEntry = {
  id: string;
  name: string;
  department: {
    label: string;
  };
  location: {
    city: string;
    country: string; // We want to filter for jobs in `id`
    remote: boolean;
  };
  releasedDate: string;
};

const companyName = 'Ajaib';
const company = companies.find((c) => c.name === companyName);

export const scrape = async () => {
  if (!company) return;

  const response = await fetch(
    'https://api.smartrecruiters.com/v1/companies/Ajaib/postings',
  );
  const json = await response.json();
  const jobEntries = json.content as SmartRecruiterJobEntry[];

  const jobOpenings = jobEntries
    .map((job) => {
      // Only fetch remote Indonesia-based jobs
      if (!job.location.remote) return null;
      if (job.location.country !== 'id') return null;
      if (!job.department.label) return null;

      return {
        company: company.name,
        departmentName: job.department.label,
        description: '',
        url: `https://jobs.smartrecruiters.com/Ajaib/${job.id}`,
        jobTitle: job.name,
        location: job.location.country,
        publishedAt: new Date(job.releasedDate).toISOString(),
      };
    })
    .filter(Boolean);

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
