import clsx from 'clsx';
import type { GetStaticProps, NextPage } from 'next';
import { CompanyCard } from '../components/CompanyCard';
import { Company } from '../lib/types';
import { companies } from '../utils/dataSources/constants';
import { db } from '../utils/dataSources/db';

type Props = {
  companies: Company[];
};

/* Courtesy of: https://csshero.org/mesher/ */
const FancyBackground = () => {
  return (
    <>
      <div className={clsx('fancyBackground', 'fixed', 'inset-0', '-z-10')} />
      <div
        className={clsx(
          'fancyBackgroundClipper',
          'fixed',
          '-z-10',
          'bg-slate-50',
        )}
      />
      <style jsx>{`
        .fancyBackground {
          background-color: hsla(0, 100%, 50%, 1);
          background-image: radial-gradient(
              at 40% 20%,
              hsla(277, 100%, 74%, 1) 0px,
              transparent 50%
            ),
            radial-gradient(
              at 80% 0%,
              hsla(201, 100%, 56%, 1) 0px,
              transparent 50%
            ),
            radial-gradient(
              at 0% 50%,
              hsla(327, 20%, 60%, 1) 0px,
              transparent 50%
            ),
            radial-gradient(
              at 75% 36%,
              hsla(229, 100%, 76%, 1) 0px,
              transparent 50%
            ),
            radial-gradient(
              at 0% 100%,
              hsla(271, 100%, 77%, 1) 0px,
              transparent 50%
            ),
            radial-gradient(
              at 76% 100%,
              hsla(264, 100%, 70%, 1) 0px,
              transparent 50%
            ),
            radial-gradient(
              at 0% 0%,
              hsla(232, 100%, 76%, 1) 0px,
              transparent 50%
            );
        }

        .fancyBackgroundClipper {
          bottom: -20vh;
          width: 200vw;
          height: 60vh;
          transform: translateX(-10vw) rotate(-10deg);
        }
      `}</style>
    </>
  );
};

const Container: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return <div className={clsx('p-8', 'max-w-6xl', 'mx-auto')}>{children}</div>;
};

const HeroText = () => {
  return (
    <h1
      className={clsx(
        'xl:fixed',
        'text-4xl',
        'sm:text-5xl',
        'md:text-7xl',
        'leading-tight',
        'sm:leading-snug',
        'md:leading-tight',
        'text-white',
        'font-bold',
        'drop-shadow-lg',
        'pt-24',
        'xl:pt-[22vh]',
        'max-w-xl',
        'mb-16',
      )}
    >
      Indonesian
      <br />
      WFA-friendly companies <span aria-hidden>🇮🇩</span>
    </h1>
  );
};

const Home: NextPage<Props> = () => {
  return (
    <>
      <div className={clsx('isolate', 'overflow-x-hidden')}>
        <FancyBackground />
        <Container>
          <main className={clsx('xl:flex', 'justify-between')}>
            <div className={clsx('flex-[3]', 'relative')}>
              <HeroText />
            </div>
            <ul
              className={clsx(
                'flex-[2]',
                'grid',
                'sm:grid-cols-2',
                'md:grid-cols-3',
                'lg:grid-cols-4',
                'xl:grid-cols-2',
                'gap-6',
                'justify-items-center',
              )}
            >
              {companies.map((company) => {
                const usedName = (
                  company.safeName || company.name
                ).toLowerCase();

                return (
                  <li key={usedName}>
                    <CompanyCard
                      name={company.name}
                      safeName={usedName}
                      image={company.imageUrl}
                    />
                  </li>
                );
              })}
            </ul>
          </main>
        </Container>
      </div>
    </>
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
