import fetch from 'isomorphic-unfetch';
import fs from 'fs';
import path from 'path';

const downloadFile = async (url: string, path: string) => {
  const res = await fetch(url);
  const fileStream = fs.createWriteStream(path);

  await new Promise((resolve, reject) => {
    // @ts-expect-error
    res.body.pipe(fileStream);
    // @ts-expect-error
    res.body.on('error', reject);
    fileStream.on('finish', resolve);
  });
};

/**
 * This script is used to download an image from an URL and
 * store it to /public/assets/company-logo
 * Replace company info here as needed.
 */
const company = {
  name: 'Fazz Financial',
  jobOpeningsUrl: 'https://jobs.lever.co/fazzfinancial?department=Engineering',
  imageUrl:
    'https://mobitekno.com/wp-content/uploads/2021/03/Logo-Fazz-Financial.png',
  safeName: 'FazzFinancial',
};

const imageUrl = company.imageUrl;
const detectedExtension = imageUrl.split('.').pop() ?? '';

let usedExtension = detectedExtension;

if (!['png', 'jpg', 'svg'].includes(usedExtension)) {
  usedExtension = 'png';
}

const usedFilename = company.safeName ?? company.name;

downloadFile(
  imageUrl,
  path.join(
    __dirname,
    '../../public/assets/company-logo',
    `${usedFilename}.${usedExtension}`,
  ),
);
