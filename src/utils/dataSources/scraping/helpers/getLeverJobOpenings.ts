import fetch from 'isomorphic-unfetch';
import { Company, JobOpening } from '../../../../lib/types';

type LeverJobEntry = {
  categories: {
    department: string;
    location: string;
    team: string;
  };
  hostedUrl: string;
  text: string;
  createdAt: string;
};

export const getLeverJobOpenings = async (
  company: Company,
  leverId: string,
  { useTeamName } = { useTeamName: false },
): Promise<JobOpening[]> => {
  const response = await fetch(
    `https://api.lever.co/v0/postings/${leverId}?mode=json`,
  );
  const json: LeverJobEntry[] = await response.json();

  const jobOpenings: JobOpening[] = json.map((job) => {
    return {
      company: company.name,
      departmentName: useTeamName
        ? job.categories.team
        : job.categories.department,
      description: '',
      url: job.hostedUrl || company.jobOpeningsUrl,
      jobTitle: job.text,
      location: job.categories.location,
      publishedAt: new Date(job.createdAt).toISOString(),
    };
  });

  return jobOpenings;
};
