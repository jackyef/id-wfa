import fs from 'fs';
import path from 'path';
import fetch from 'isomorphic-unfetch';

import { JobOpening } from '../../../lib/types';
import { prettierFormat } from '../../prettier';

type AshbyHQJobOpening = {
  id: string;
  departmentName: string;
  employmentType: string;
  locationName: string;
  title: string;
};

type AshbyHQJobData = {
  jobPostingBriefs: AshbyHQJobOpening[];
};

const companyName = 'Pinhome';

export const getJobOpenings = async (): Promise<JobOpening[]> => {
  const response = await fetch(
    'https://jobs.ashbyhq.com/api/non-user-graphql',
    {
      headers: {
        accept: '*/*',
        'accept-language': 'en-US,en;q=0.9,id;q=0.8',
        'apollographql-client-name': 'frontend_non_user',
        'apollographql-client-version': '0.1.0',
        'content-type': 'application/json',
        'sec-ch-ua':
          '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        Referer: 'https://jobs.ashbyhq.com/Pinhome/',
        'Referrer-Policy': 'same-origin',
      },
      body: '{"operationName":"ApiJobPostingBriefsWithIds","variables":{"organizationHostedJobsPageName":"Pinhome"},"query":"query ApiJobPostingBriefsWithIds($organizationHostedJobsPageName: String!) {\\n  jobPostingBriefs: jobPostingBriefsWithIds(\\n    organizationHostedJobsPageName: $organizationHostedJobsPageName\\n  ) {\\n    id\\n    title\\n    departmentId\\n    departmentName\\n    locationId\\n    locationName\\n    employmentType\\n    secondaryLocations {\\n      ...JobPostingSecondaryLocationParts\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\\nfragment JobPostingSecondaryLocationParts on JobPostingSecondaryLocation {\\n  locationId\\n  locationName\\n  __typename\\n}\\n"}',
      method: 'POST',
    },
  );

  const json = await response.json();
  const { jobPostingBriefs }: AshbyHQJobData = json.data;

  const jobOpenings: JobOpening[] = jobPostingBriefs.map((job) => {
    return {
      company: companyName,
      departmentName: job.departmentName,
      description: '',
      url: `https://jobs.ashbyhq.com/Pinhome/${job.id}`,
      jobTitle: job.title,
      location: job.locationName,
    };
  });

  return jobOpenings;
};

export const scrape = async () => {
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
