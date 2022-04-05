import type { ContextProviderPlugin } from 'aws-cdk/lib/api/plugin';
import type { AwsIpRangesQuery, AwsIpRangesResult, Prefix } from './types';
import { get } from './utils';

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
  [key: string]: string
}
interface Ipv4Prefix extends IpRangesPrefix {
  ip_prefix: string
}
interface Ipv6Prefix extends IpRangesPrefix {
  ipv6_prefix: string
}


type IpRangesPrefixList = IpRangesPrefix[]

function isIpv6Prefix(prefix: IpRangesPrefix): boolean {
  return typeof prefix.ipv6_prefix === 'string';
}
function isIpv4Prefix(prefix: IpRangesPrefix): boolean {
  return typeof prefix.ip_prefix === 'string';
}
export class AwsIpRangesContextProvider implements ContextProviderPlugin {

  private static ipRangesUrl: string = 'https://ip-ranges.amazonaws.com/ip-ranges.json';

  private static data?: IpRangesData;

  private static async fetchIpRangesJson(): Promise<IpRangesData> {
    return JSON.parse(await get(AwsIpRangesContextProvider.ipRangesUrl)) as IpRangesData;
  }

  private static filter(arr: AwsIpRangesQuery[keyof AwsIpRangesQuery], value: string) {
    return arr.length === 0 || arr.includes(value);
  }

  private static applyFilters(list: IpRangesPrefixList, { services, regions, networkBorderGroups }: AwsIpRangesQuery) {
    return list.filter(({ service, region, network_border_group }) =>
      AwsIpRangesContextProvider.filter(services, service) &&
      AwsIpRangesContextProvider.filter(regions, region) &&
      AwsIpRangesContextProvider.filter(networkBorderGroups, network_border_group),
    );
  }

  private static mapToPrefix(item: IpRangesPrefix): Prefix {
    const { network_border_group: networkBorderGroup, service, region } = item;
    let prefix: string;
    if (isIpv6Prefix(item)) {
      prefix = item.ipv6_prefix!;
    } else if (isIpv4Prefix(item)) {
      prefix = item.ip_prefix;
    } else {
      throw new Error(`Could not map provided prefix. ${JSON.stringify(item)}`);
    }
    return {
      prefix,
      service,
      region,
      networkBorderGroup,
    };
  }

  public async getValue(args: AwsIpRangesQuery): Promise<AwsIpRangesResult> {
    AwsIpRangesContextProvider.data = AwsIpRangesContextProvider.data || await AwsIpRangesContextProvider.fetchIpRangesJson();
    return {
      ipv4: AwsIpRangesContextProvider
        .applyFilters(AwsIpRangesContextProvider.data.prefixes, args)
        .map(AwsIpRangesContextProvider.mapToPrefix),

      ipv6: AwsIpRangesContextProvider
        .applyFilters(AwsIpRangesContextProvider.data.ipv6_prefixes, args)
        .map(AwsIpRangesContextProvider.mapToPrefix),
    };
  }
}