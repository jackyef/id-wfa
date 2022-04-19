export type Company = {
  name: string;
  imageUrl: string;
  jobOpeningsUrl: string;
  jobOpeningsFeedUrl?: string; // Optional, used if the page implement a feed for the job openings
  safeName?: string;
};

export type JobOpening = {
  jobTitle: string;
  url: string; // url to the job opening detail page, fallback to jobOpeningsUrl if none exists
  company: Company['name'];
  departmentName: string; // Engineering, Design, etc.

  // The properties below are optional
  level?: string; // Junior, Mid, Senior, etc.
  location?: string;
  description?: string;
  publishedAt?: string; // ISO date string
};
