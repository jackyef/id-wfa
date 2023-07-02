import clsx from 'clsx';
import Link from 'next/link';
import Container from './Container';

const FancyBackground = () => {
  return (
    <>
      <div
        className={clsx('fancyBackground', 'absolute', 'inset-0', '-z-10')}
      />
      <Container>
        <Link href="/" passHref>
          <a
            className={clsx('-m-2', 'text-2xl', 'text-white', 'font-bold')}
            aria-label="Back to homepage"
          >
            <span aria-hidden>id-WFA 🇮🇩</span>
          </a>
        </Link>
      </Container>
      <style jsx>{`
        .fancyBackground {
          background-color: #b499ff;
          background-image: radial-gradient(
              at 70% 27%,
              hsla(289, 70%, 61%, 1) 0px,
              transparent 50%
            ),
            radial-gradient(
              at 96% 27%,
              hsla(296, 61%, 77%, 1) 0px,
              transparent 50%
            ),
            radial-gradient(
              at 99% 41%,
              hsla(288, 98%, 67%, 1) 0px,
              transparent 50%
            ),
            radial-gradient(
              at 54% 76%,
              hsla(315, 61%, 77%, 1) 0px,
              transparent 50%
            ),
            radial-gradient(
              at 60% 24%,
              hsla(189, 68%, 65%, 1) 0px,
              transparent 50%
            ),
            radial-gradient(
              at 86% 97%,
              hsla(263, 65%, 62%, 1) 0px,
              transparent 50%
            ),
            radial-gradient(
              at 64% 48%,
              hsla(122, 98%, 75%, 1) 0px,
              transparent 50%
            );
        }
      `}</style>
    </>
  );
};

export default FancyBackground;
