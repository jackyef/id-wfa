import BackspaceIcon from '@heroicons/react/solid/BackspaceIcon';
import clsx from 'clsx';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Container from '../components/Common/Container';
import FancyBackground from '../components/Common/FancyBackground';
import { Footer } from '../components/Footer';

const DisclaimerPage: NextPage = () => {
  const router = useRouter();
  return (
    <div>
      <FancyBackground />
      <Container>
        <div
          className={clsx(
            'flex',
            'flex-col',
            'gap-4',

            'p-4 md:p-6',
            'bg-opacity-75',

            'rounded-md',
            'border',
            'border-gray-300',
            'border-opacity-25',
            'bg-white',
          )}
        >
          <main className={clsx('flex', 'flex-col', 'gap-4')}>
            <h1 className={clsx('text-2xl', 'font-bold')}>Disclaimer</h1>
            <p>
              This project is not affiliated with any of the companies listed.
              Some information might be inaccurate/incomplete, including but not
              limited to:
              <ol
                className={clsx('list', 'list-inside', 'list-decimal', 'mt-2')}
              >
                <li>
                  Job openings that are included in the site, but apparently not
                  WFA-friendly.
                </li>
                <li>
                  Job openings that are WFA-friendly but not included in the
                  site.
                </li>
              </ol>
            </p>
          </main>

          <section className={clsx('flex', 'justify-between', 'items-center')}>
            <button
              onClick={() => router.back()}
              className={clsx(
                'flex',
                'gap-2',
                'items-center',
                'border',
                'border-black',
                'border-opacity-25',
                'rounded-md',
                'p-2',
                'hover:bg-black',
                'hover:text-white',
                'transition',
                'duration-200',
                'cursor-pointer',
                'uppercase',
                'tracking-wider',
                'font-semibold',
                'text-sm',
              )}
            >
              <BackspaceIcon className={clsx('h-5', 'w-5')} />
              back
            </button>
            <Footer />
          </section>
        </div>
      </Container>
    </div>
  );
};

export default DisclaimerPage;
