import clsx from 'clsx';

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={clsx('p-8', 'max-w-6xl', 'mx-auto')}>{children}</div>;
};

export default Container;
