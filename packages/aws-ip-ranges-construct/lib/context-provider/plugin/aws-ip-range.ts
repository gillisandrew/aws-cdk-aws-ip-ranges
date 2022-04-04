import * as https from 'https';

import { ContextProviderPlugin, IpRangesData, AwsIpRangeContextQuery, AwsIpRangeContextResponse } from '../../types';



/**
 * Plugin to look up AWS IP ranges
 */
export class AwsIpRangeContextProvider implements ContextProviderPlugin {
    protected static IP_RANGE_JSON_URL = 'https://ip-ranges.amazonaws.com/ip-ranges.json'
    private static RAW_DATA?: string;

    constructor() { }

    public async getValue(args: AwsIpRangeContextQuery) {
        const search = {
            services: [],
            regions: [],
            networkBorderGroups: [],
            ...args
        }
        return this.getAwsIpRange(search.services, search.regions, search.networkBorderGroups);
    }

    private async getAwsIpRange(services: string[], regions: string[], networkBorderGroups: string[]): Promise<AwsIpRangeContextResponse> {
        const rawData = AwsIpRangeContextProvider.RAW_DATA ?? await AwsIpRangeContextProvider.downloadIpRangesJsonFile()
        const prefixes = (JSON.parse(rawData) as IpRangesData).prefixes

        return {
            prefixes: prefixes.filter(({ service, region, network_border_group }) => {
                if (services.length > 0 && !(service in services))
                    return false;
                if (regions.length > 0 && !(region in regions))
                    return false;
                if (networkBorderGroups.length > 0 && !(network_border_group in networkBorderGroups))
                    return false;
                return true
            })
        }

    }

    private static async downloadIpRangesJsonFile(): Promise<string> {
        return new Promise((resolve, reject) => {
            const chunks: string[] = []
            https.get(AwsIpRangeContextProvider.IP_RANGE_JSON_URL,
                (message) => {
                    message.on('data', (chunk) => {
                        chunks.push(chunk)
                    })
                    message.on('close', () => {
                        resolve(chunks.join(''))
                    })

                    message.on('error', () => {
                        reject(new Error('An error occured fetching ip-ranges.json content'))
                    })
                })
        })
    }
}