import clsx from 'clsx';
import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { Company } from '../lib/types';
import { companies } from '../utils/dataSources/constants';
import { db } from '../utils/dataSources/db';

type Props = {
  companies: Company[];
};

const Home: NextPage<Props> = () => {
  return (
    <div>
      <main>
        <h1>Indonesian WFA-friendly companies 🇮🇩</h1>
        <ul>
          {companies.map((company) => {
            const usedName = (company.safeName || company.name).toLowerCase();

            return (
              <li key={usedName}>
                <Link href={`/company/${usedName}`} passHref>
                  <a
                    className={clsx(
                      'pl-4',
                      'text-purple-600',
                      'hover:text-purple-500',
                      'hover:underline',
                    )}
                  >
                    {company.name}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  return {
    props: {
      companies: db.getCompanies(),
    },
  };
};

export default Home;
