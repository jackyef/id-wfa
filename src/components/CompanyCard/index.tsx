import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  image: string;
  name: string;
  safeName: string;
};

export const CompanyCard = ({ image, name, safeName }: Props) => {
  return (
    <>
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
        )}
      >
        <div
          className={clsx(
            'rounded-full',
            'shadow-inner',
            'shadow-slate-300',
            'p-4',
          )}
        >
          <img
            alt=""
            src={image}
            loading="lazy"
            className={clsx('w-20', 'h-20', 'object-contain', 'rounded-full')}
          />
        </div>
        <h3>{name}</h3>

        <Link href={`/company/${safeName}`} passHref>
          <a
            className={clsx(
              'w-full',
              'text-center',
              'py-4',
              'border-t-2',
              'border-t-slate-100',
              'text-purple-600',
              'hover:text-purple-500',
              'hover:shadow-inner',
              'hover:shadow-purple-200',
              'focus:text-purple-500',
              'focus:shadow-inner',
              'focus:shadow-purple-200',
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
