import * as https from 'https';
import * as fs from 'fs';
import { sleep } from 'deasync';
import { debug, success, warning } from './logging';

export class IpRangesJsonData {
    protected static IP_RANGES_JSON_URL = 'https://ip-ranges.amazonaws.com/ip-ranges.json'
    protected static timeout: number = 2000
    protected static tick: number = 100;

    protected static data?: string;

    private constructor() { }

    private static wait(check: () => boolean) {
        const limit = Date.now() + this.timeout;
        while (Date.now() < limit && !check()) {
            sleep(this.tick);
        }
    }

    public static download(path?: string) {
        const chunks: string[] = []

        https.get(this.IP_RANGES_JSON_URL,
            (message) => {
                message.on('data', (chunk) => {
                    chunks.push(chunk)
                })
                message.on('close', () => {
                    this.data = chunks.join('')
                    if (path) {
                        fs.writeFileSync(path, this.data)
                    }
                })
                message.on('error', () => {
                    throw new Error('An error occured fetching ip-ranges.json data')
                })
            })

        this.wait(() => !!this.data)
    }

    private static load(path: string) {
        this.data = fs.readFileSync(path).toString()
    }

    public static get(path?: string): string {
        if (path) {
            debug('Attempting to load AWS IP ranges from file.')
            try {
                this.load(path)
            } catch (e) {
                warning('Failed to load AWS IP ranges from file. Downloading instead.')
            }
        }
        if (!this.data) {
            debug('Downloading AWS IP ranges.')
            this.download(path)
            success('AWS IP ranges downloaded.')
        }

        return this.data!
    }
}