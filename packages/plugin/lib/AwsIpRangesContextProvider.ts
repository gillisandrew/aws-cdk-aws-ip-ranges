import type { ContextProviderPlugin } from 'aws-cdk/lib/api/plugin';
import { debug, error } from 'aws-cdk/lib/logging';
import type { AwsIpRangesQuery, AwsIpRangesResult, Prefix } from './types';
import { get } from './utils';
interface IpRangesData {
  syncToken: string
  createDate: string
  prefixes: Ipv4Prefix[]
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
  protected ipRangesUrl: string = 'https://ip-ranges.amazonaws.com/ip-ranges.json';
  protected data: Promise<IpRangesData>;

  constructor() {
    this.data = this.fetchIpRangesJson();
  }

  private async fetchIpRangesJson(): Promise<IpRangesData> {
    debug('Fetching latest ip-ranges.json from https://ip-ranges.amazonaws.com/ip-ranges.json');
    try {
      return JSON.parse(
        await get(this.ipRangesUrl),
      ) as IpRangesData;
    } catch (e) {
      error('An error occured fetching the latest ip-ranges.json');
      throw e;
    }
  }

  private filter(
    arr: string[],
    value: string,
  ) {
    return arr.length === 0 || arr.includes(value);
  }

  private applyFilters(
    list: IpRangesPrefixList,
    { services, regions, networkBorderGroups }: AwsIpRangesQuery,
  ) {
    return list.filter(
      ({ service, region, network_border_group }) =>
        this.filter(
          services,
          service,
        ) &&
        this.filter(
          regions,
          region,
        ) &&
        this.filter(
          networkBorderGroups,
          network_border_group,
        ),
    );
  }

  private mapToPrefix(item: IpRangesPrefix): Prefix {
    const { network_border_group: networkBorderGroup, service, region } = item;
    let prefix: string;

    if (isIpv6Prefix(item)) {
      prefix = item.ipv6_prefix!;
    } else if (isIpv4Prefix(item)) {
      prefix = item.ip_prefix;
    } else {
      throw new Error('Could not map provided prefix.');
    }

    return {
      prefix,
      service,
      region,
      networkBorderGroup,
    };
  }

  public async getValue(query: AwsIpRangesQuery): Promise<AwsIpRangesResult> {
    /**
     * Fetch data if it is missing
     */
    this.data = this.data || (await this.fetchIpRangesJson());
    const data = await this.data;

    /**
     * Return normalized data
     */
    return {
      syncToken: data.syncToken,
      ipv4: this.applyFilters(
        data.prefixes,
        query,
      ).map(this.mapToPrefix),
      ipv6: this.applyFilters(
        data.ipv6_prefixes,
        query,
      ).map(this.mapToPrefix),
    };
  }
}
