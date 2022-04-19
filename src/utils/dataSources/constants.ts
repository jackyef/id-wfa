import { Company } from '../../lib/types';

export const companies: ReadonlyArray<Company> = [
  {
    name: 'Pinhome',
    jobOpeningsUrl: 'https://jobs.ashbyhq.com/Pinhome/',
    imageUrl:
      'https://app.ashbyhq.com/api/images/org-theme-wordmark/1bfdaaee-e805-43cb-85a6-17c4eced17f8/855b6de7-3c4d-4b94-9ae3-02fc8a44c87c.png',
  },
  {
    name: 'eFishery',
    jobOpeningsUrl: 'https://efishery.com/en/job-search/',
    imageUrl:
      'https://efishery.com/wp-content/uploads/2021/10/logo-colored.png',
  },
  {
    name: 'Pahamify',
    jobOpeningsUrl: 'https://pahamify.com/career/',
    imageUrl:
      'https://d1fdloi71mui9q.cloudfront.net/QzVygerQReyNJjz9EezH_1aOIXRSE4YoDmKP5',
    jobOpeningsFeedUrl: 'https://stg.pahamify.com/career/feed/',
  },

  // Skipping Amar Bank for now because they don't seem to have a dedicated
  // Job opening detail page. They just have a bunch of mailto:* links
  // {
  //   name: 'Amar Bank',
  //   jobOpeningsUrl: '',
  //   imageUrl: '',
  // },

  // Skipping because this one requires XSRF token
  // {
  //   name: 'Sekolah.mu',
  //   jobOpeningsUrl: 'https://jobs.talentics.id/sekolahmu',
  //   imageUrl: 'https://cdn.sekolah.mu/assets/home/sekolahmu_logo.svg',
  // },
  {
    name: 'CoLearn',
    jobOpeningsUrl: 'https://kelas.colearn.id/career/',
    imageUrl:
      'https://s3-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/610/400/resized/CL_Logo_Blue.png?1608617510',
  },
  {
    name: 'Qasir.id',
    jobOpeningsUrl: 'https://www.qasir.id/career',
    imageUrl: 'https://global-uploads.webflow.com/5f17b3a6740e17c63ab5e642/60235cc90389675a2a31abbb_qasir-logo.svg',
  },
  {
    name: 'Finantier',
    jobOpeningsUrl: '',
    imageUrl: '',
  },
  {
    name: 'ALAMI',
    jobOpeningsUrl: '',
    imageUrl: '',
  },
  {
    name: 'BukuWarung',
    jobOpeningsUrl: '',
    imageUrl: '',
  },
  {
    name: 'Flip.id',
    jobOpeningsUrl: '',
    imageUrl: '',
  },
  {
    name: 'Moladin',
    jobOpeningsUrl: '',
    imageUrl: '',
  },
  {
    name: 'HappyFresh',
    jobOpeningsUrl: '',
    imageUrl: '',
  },
  {
    name: 'TADA',
    jobOpeningsUrl: '',
    imageUrl: '',
  },
  {
    name: 'Influx',
    jobOpeningsUrl: '',
    imageUrl: '',
  },
  {
    name: 'Ajaib',
    jobOpeningsUrl: '',
    imageUrl: '',
  },
  {
    name: 'Ajaib',
    jobOpeningsUrl: '',
    imageUrl: '',
  },
  {
    name: 'Ajaib',
    jobOpeningsUrl: '',
    imageUrl: '',
  },
  {
    name: 'Ajaib',
    jobOpeningsUrl: '',
    imageUrl: '',
  },
  {
    name: 'Ajaib',
    jobOpeningsUrl: '',
    imageUrl: '',
  },
  {
    name: 'Kata.ai',
    jobOpeningsUrl: '',
    imageUrl: '',
  },
  {
    name: 'Bibit',
    jobOpeningsUrl: '',
    imageUrl: '',
  },
  {
    name: 'Tiket.com',
    jobOpeningsUrl: '',
    imageUrl: '',
  },
] as const;
