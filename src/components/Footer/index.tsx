import ShieldExclamationIcon from '@heroicons/react/outline/ShieldExclamationIcon';
import CodeIcon from '@heroicons/react/outline/CodeIcon';
import AtSymbolIcon from '@heroicons/react/outline/AtSymbolIcon';
import clsx from 'clsx';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className={clsx('text-slate-700')}>
      <nav>
        <ul className={clsx('flex', 'space-x-4', 'justify-end')}>
          <li>
            <Link href="/disclaimer">
              <a aria-label="See code on GitHub" title="See code on GitHub">
                <ShieldExclamationIcon className={clsx('h-6', 'w-6')} />
              </a>
            </Link>
          </li>
          <li>
            <a
              href="https://github.com/jackyef/id-wfa"
              aria-label="See code on GitHub"
              title="See code on GitHub"
            >
              <CodeIcon className={clsx('h-6', 'w-6')} />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/jackyef__"
              aria-label="Connect with author on Twitter"
              title="Connect with author on Twitter"
            >
              <AtSymbolIcon className={clsx('h-6', 'w-6')} />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};
