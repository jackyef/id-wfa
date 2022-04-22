import { Company } from '../../lib/types';

export const companies: ReadonlyArray<Company> = [
  {
    name: 'Pinhome',
    jobOpeningsUrl: 'https://jobs.ashbyhq.com/Pinhome/',
    imageUrl: '/assets/company-logo/Pinhome.png',
  },
  {
    name: 'eFishery',
    jobOpeningsUrl: 'https://efishery.com/en/job-search/',
    imageUrl: '/assets/company-logo/eFishery.png',
  },
  {
    name: 'Pahamify',
    jobOpeningsUrl: 'https://pahamify.com/career/',
    imageUrl: '/assets/company-logo/Pahamify.jpg',
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
    imageUrl: '/assets/company-logo/CoLearn.png',
  },
  {
    name: 'Qasir.id',
    jobOpeningsUrl: 'https://www.qasir.id/career',
    imageUrl: '/assets/company-logo/QasirId.svg',
    safeName: 'QasirId',
  },
  {
    name: 'Finantier',
    jobOpeningsUrl: 'https://finantier.co/careers/',
    imageUrl: '/assets/company-logo/Finantier.png',
  },
  {
    name: 'ALAMI',
    jobOpeningsUrl: 'https://alamisharia.co.id/en/career/',
    imageUrl: '/assets/company-logo/ALAMI.svg',
  },
  {
    name: 'BukuWarung',
    jobOpeningsUrl: 'https://bukuwarung.com/career/',
    imageUrl: '/assets/company-logo/BukuWarung.png',
  },
  {
    name: 'Flip.id',
    jobOpeningsUrl: 'https://career.flip.id/jobs',
    imageUrl: '/assets/company-logo/FlipId.png',
    safeName: 'FlipId',
  },
  {
    name: 'Moladin',
    jobOpeningsUrl: 'https://moladin.com/careers/vacancies',
    imageUrl: '/assets/company-logo/Moladin.svg',
  },
  {
    name: 'HappyFresh',
    jobOpeningsUrl: 'https://careers.happyfresh.com/',
    imageUrl: '/assets/company-logo/HappyFresh.svg',
  },

  // Skipping TADA because their jobs seems to be hybrid remote, not fully remote (WFA)
  // {
  //   name: 'TADA',
  //   jobOpeningsUrl: '',
  //   imageUrl: '',
  // },

  // Skipping influx because it doesn't seem to be a Indonesian company
  // {
  //   name: 'Influx',
  //   jobOpeningsUrl: '',
  //   imageUrl: '',
  // },

  {
    name: 'Ajaib',
    jobOpeningsUrl: 'https://career.ajaib.co.id/jobs/',
    imageUrl: '/assets/company-logo/Ajaib.png',
  },
  {
    name: 'Kata.ai',
    jobOpeningsUrl: 'https://careers.smartrecruiters.com/Kataai',
    imageUrl: '/assets/company-logo/KataAi.png',
    safeName: 'KataAi',
  },
  {
    name: 'Stockbit/Bibit',
    jobOpeningsUrl: 'https://apply.workable.com/stockbit/',
    imageUrl: '/assets/company-logo/StockbitBibit.svg',
    safeName: 'StockbitBibit',
  },
  {
    name: 'Warung Pintar',
    jobOpeningsUrl:
      'https://warungpintar.freshteam.com/jobs?location=[]&department=[]&jobType=[]&title=&isRemoteLocation=true',
    imageUrl: '/assets/company-logo/WarungPintar.png',
    safeName: 'WarungPintar',
  },
  {
    name: 'Amartha',
    jobOpeningsUrl: 'https://apply.workable.com/amartha/',
    imageUrl: '/assets/company-logo/Amartha.png',
  },
  {
    name: 'Bobobox',
    jobOpeningsUrl:
      'https://glints.com/id/en/companies/pt-bobobox-mitra-indonesia/00e32ac6-95b0-4723-8dc2-f3a32f1d884d',
    imageUrl: '/assets/company-logo/Bobobox.jpg',
  },
  {
    name: 'Ruangguru',
    jobOpeningsUrl: 'https://career.ruangguru.com/',
    imageUrl: '/assets/company-logo/Ruangguru.png',
  },
  {
    name: 'Mayar',
    jobOpeningsUrl:
      'https://glints.com/id/en/companies/mayar/58581036-8b82-4e86-b75f-b8e57ef544ad',
    imageUrl: '/assets/company-logo/Mayar.png',
  },
  {
    name: 'Fazz Financial',
    jobOpeningsUrl:
      'https://jobs.lever.co/fazzfinancial?department=Engineering',
    imageUrl: '/assets/company-logo/FazzFinancial.png',
    safeName: 'FazzFinancial',
  },
  {
    name: 'Pintu',
    jobOpeningsUrl: 'https://careers.pintu.co.id/jobs',
    imageUrl: '/assets/company-logo/Pintu.png',
  },

  // Skipping Tiket.com because their career pages are hard to scrape lol
  // {
  //   name: 'Tiket.com',
  //   jobOpeningsUrl: 'https://www.tiket.com/careers/',
  //   imageUrl: '',
  // },
] as const;
