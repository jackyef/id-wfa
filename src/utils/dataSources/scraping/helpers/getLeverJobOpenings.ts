import { Company, JobOpening } from '../../../../lib/types';

type LeverJobEntry = {
  categories: {
    department: string;
    location: string;
  };
  hostedUrl: string;
  text: string;
};

export const getLeverJobOpenings = async (
  company: Company,
  leverId: string,
): Promise<JobOpening[]> => {
  const response = await fetch(
    `https://api.lever.co/v0/postings/${leverId}?mode=json`,
  );
  const json: LeverJobEntry[] = await response.json();

  const jobOpenings: JobOpening[] = json.map((job) => {
    return {
      company: company.name,
      departmentName: job.categories.department,
      description: '',
      employmentType: 'Full-time' as const,
      url: job.hostedUrl || company.jobOpeningsUrl,
      jobTitle: job.text,
      location: job.categories.location,
    };
  });

  return jobOpenings;
};
