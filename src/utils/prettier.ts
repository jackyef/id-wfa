import prettier from 'prettier';

export const prettierFormat = (source: string): string => {
  return prettier.format(source, {
    semi: true,
    parser: 'babel',
    singleQuote: true,
    printWidth: 80,
    trailingComma: 'all',
  });
};
