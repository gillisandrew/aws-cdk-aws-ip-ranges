import * as https from 'https'

import { ContextProviderPlugin } from "aws-cdk/lib/api/plugin";
import { GetContextKeyOptions, GetContextKeyResult, Token } from "aws-cdk-lib";
import { AwsIpRangesQuery, AwsIpRangesResult, Prefix } from "./types";

interface IpRangesData {
    syncToken: string;
    createDate: string;
    prefixes: Ipv4Prefix[],
    ipv6_prefixes: Ipv6Prefix[]
}
interface IpRangesPrefix {
    region: string
    service: string
    network_border_group: string
}
interface Ipv4Prefix extends IpRangesPrefix {
    ip_prefix: string

}
interface Ipv6Prefix extends IpRangesPrefix {
    ipv6_prefix: string
}


type IpRangesPrefixList = IpRangesPrefix[]


export class AwsIpRangesContextProvider implements ContextProviderPlugin {

    private fetchIpRangesJson(url = 'https://ip-ranges.amazonaws.com/ip-ranges.json'): Promise<IpRangesData> {
        return new Promise((resolve, reject) => {
            const chunks: string[] = []
            https.get(url,
                (message) => {
                    message.on('data', (chunk) => {
                        chunks.push(chunk)
                    })
                    message.on('close', () => {
                        const data = JSON.parse(chunks.join('')) as IpRangesData
                        resolve(data)
                    })
                    message.on('error', () => {
                        reject(new Error('An error occured fetching ip-ranges.json data'))
                    })
                })
        })
    }

    private applyFilters(list: IpRangesPrefixList, { services, regions, networkBorderGroups }: AwsIpRangesQuery) {
        return list.filter(({ service, region, network_border_group }) => {
            if (services.length > 0 && !services.includes(service))
                return false;
            if (regions.length > 0 && !regions.includes(region))
                return false;
            if (networkBorderGroups.length > 0 && !networkBorderGroups.includes(network_border_group))
                return false;
            return true
        })
    }

    private getPropsString(props: AwsIpRangesQuery): string {
        return [
            `:services=`,
            props.services.sort((a, b) => a.localeCompare(b)).join(','),
            `:regions=`,
            props.regions.sort((a, b) => a.localeCompare(b)).join(','),
            `:networkBorderGroups=`,
            props.networkBorderGroups.sort((a, b) => a.localeCompare(b)).join(','),
        ].join('')
    }

    public getKey(scope: any, options: GetContextKeyOptions): GetContextKeyResult {
        const props = options.props as AwsIpRangesQuery

        if (Object.values(props).find(x => Token.isUnresolved(x))) {
            throw new Error(
                `Cannot determine scope for context provider ${options.provider}.\n` +
                'This usually happens when one or more of the provider props have unresolved tokens');
        }

        return {
            key: `${options.provider}${this.getPropsString(props)}`,
            props,
        };
    }

    public async getValue(args: AwsIpRangesQuery): Promise<AwsIpRangesResult> {
        const data = await this.fetchIpRangesJson();
        return {
            ipv4: this.applyFilters(data.prefixes, args).map<Prefix>((item) => {
                const { ip_prefix, network_border_group, ...rest } = item as Ipv4Prefix
                return {
                    prefix: ip_prefix,
                    networkBorderGroup: network_border_group,
                    ...rest,
                }
            }),
            ipv6: this.applyFilters(data.ipv6_prefixes, args).map<Prefix>((item) => {
                const { ipv6_prefix, network_border_group, ...rest } = item as Ipv6Prefix
                return {
                    prefix: ipv6_prefix,
                    networkBorderGroup: network_border_group,
                    ...rest,
                }
            })
        }
    }
}