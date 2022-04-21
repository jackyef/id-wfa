import { JobOpening } from '../../../../lib/types';

export type GlintsJobEntry = {
  id: string;
  title: string;
  isRemote: boolean;
  category: {
    name: string;
  };
  country: {
    name: string;
  };
  createdAt: string;
};

export const convertGlintsJobEntries = (
  jobEntry: GlintsJobEntry,
  companyName: string,
): JobOpening => {
  const dept = jobEntry.category.name ?? null;

  return {
    company: companyName,
    departmentName: dept,
    jobTitle: jobEntry.title,
    url: `https://glints.com/id/en/opportunities/jobs/${jobEntry.id}`,
    location: jobEntry.country.name,
    publishedAt: new Date(jobEntry.createdAt).toISOString(),
  };
};
