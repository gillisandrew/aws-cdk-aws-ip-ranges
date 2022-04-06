import { promises as fs } from 'fs';
import * as https from 'https';

export function get(url: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    https.get(url, (message) => {
      const chunks: string[] = [];
      message.on('data', chunk => {
        chunks.push(chunk);
      });
      message.on('close', () => {
        resolve(chunks.join(''));
      });
      message.on('error', () => {
        reject(new Error('An error occured while fetching.'));
      });
    });

  });
}
