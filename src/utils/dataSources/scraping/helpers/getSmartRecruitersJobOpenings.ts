import { Company, JobOpening } from '../../../../lib/types';

type SmartRecruiterJobEntry = {
  id: string;
  name: string;
  department: {
    label: string;
  };
  function: {
    label: string;
  };
  location: {
    city: string;
    country: string;
    remote: boolean;
  };
  releasedDate: string;
};

export const getSmartRecruitersJobOpenings = async (
  company: Company,
  smartRecruiterId: string,
  {
    useFunctionName,
    forceRemote,
  }: {
    useFunctionName?: boolean;
    forceRemote?: boolean;
  } = {
    useFunctionName: false,
    forceRemote: false,
  },
) => {
  const response = await fetch(
    `https://api.smartrecruiters.com/v1/companies/${smartRecruiterId}/postings`,
  );
  const json = await response.json();
  const jobEntries = json.content as SmartRecruiterJobEntry[];

  const jobOpenings = jobEntries
    .map((job) => {
      if (forceRemote && !job.location.remote) return null;

      return {
        company: company.name,
        departmentName: useFunctionName
          ? job.function.label
          : job.department.label,
        description: '',
        url: `https://jobs.smartrecruiters.com/${smartRecruiterId}/${job.id}`,
        jobTitle: job.name,
        location: job.location.country,
        publishedAt: new Date(job.releasedDate).toISOString(),
      };
    })
    .filter(Boolean);

  return jobOpenings as JobOpening[];
};
