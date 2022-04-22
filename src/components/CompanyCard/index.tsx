import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { MetaTags } from '../MetaTags/MetaTags';

type Props = {
  image: string;
  name: string;
  safeName: string;
};

export const CompanyCard = ({ image, name, safeName }: Props) => {
  return (
    <>
      <MetaTags />
      <div
        className={clsx(
          'flex',
          'flex-col',
          'items-center',
          'rounded-xl',
          'shadow',
          'shadow-slate-300',
          'pt-8',
          'space-y-4',
          'bg-white',
          'min-w-[200px]',
          'max-w-[280px]',
          'sm:min-w-none',
          'sm:max-w-none',
        )}
      >
        <div
          className={clsx(
            'bg-white',
            'rounded-full',
            'shadow-inner',
            'shadow-slate-300',
            'p-4',
          )}
        >
          <Image
            alt=""
            src={image}
            loading="lazy"
            width={80}
            height={80}
            layout="fixed"
            className={clsx('w-20', 'h-20', 'object-contain', 'rounded-full')}
          />
        </div>
        <h3 className={clsx('text-slate-700', 'text-lg')}>{name}</h3>

        <Link href={`/company/${safeName}`} passHref>
          <a
            className={clsx(
              'w-full',
              'text-center',
              'py-4',
              'border-t-2',
              'rounded-b-xl',
              'bg-cyan-50',
              'text-cyan-800',
              'border-t-slate-100',
              'text-cyan-600',
              'hover:text-cyan-600',
              'hover:shadow',
              'hover:shadow-cyan-200',
              'focus:text-cyan-600',
              'focus:shadow',
              'focus:shadow-cyan-200',
              'focus:outline-dotted',
            )}
          >
            View jobs
          </a>
        </Link>
      </div>
    </>
  );
};
