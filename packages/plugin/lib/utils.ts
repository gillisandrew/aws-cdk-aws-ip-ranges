import * as https from 'https';

export function get(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: string[] = [];
    https.get(url,
      (message) => {
        message.on('data', (chunk) => {
          chunks.push(chunk);
        });
        message.on('close', () => {
          resolve(chunks.join(''));
        });
        message.on('error', () => {
          reject(new Error('An error occured fetching'));
        });
      });
  });
};