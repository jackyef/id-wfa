import { JobOpening } from '../../../../lib/types';

export type WorkableJobEntry = {
  id: string;
  shortcode: string;
  title: string;
  remote: boolean;
  location: {
    country: string;
  };
  published: string;
  department: string[];
};

export const convertWorkableJobEntries = (
  jobEntry: WorkableJobEntry,
  companyName: string,
): JobOpening => {
  const dept = jobEntry.department[0] ?? null;

  return {
    company: companyName,
    departmentName: dept,
    jobTitle: jobEntry.title,
    url: `https://apply.workable.com/stockbit/j/${jobEntry.shortcode}`,
    location: jobEntry.location.country,
    publishedAt: new Date(jobEntry.published).toISOString(),
  };
};
