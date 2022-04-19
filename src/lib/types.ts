export type Company = {
  name: string;
  imageUrl: string;
  jobOpeningsUrl: string;
  jobOpeningsFeedUrl?: string; // Optional, used if the page implement a feed for the job openings
};

export type JobOpening = {
  jobTitle: string;
  url: string; // url to the job opening detail page, fallback to jobOpeningsUrl if none exists
  location: string;
  description: string;
  company: Company['name'];
  employmentType: 'Full-time' | 'Contract';
  departmentName: string; // Engineering, Design, etc.
};
