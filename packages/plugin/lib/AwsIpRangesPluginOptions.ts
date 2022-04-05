import type { GetContextValueOptions } from 'aws-cdk-lib';
import { AwsIpRangesPlugin } from './plugin';
import { AwsIpRangesQuery } from './types';

export abstract class AwsIpRangesPluginOptions implements GetContextValueOptions {

  public static filter(filters: AwsIpRangesQuery): AwsIpRangesPluginOptions {
    return new AwsIpRangesPluginOptions(filters);
  }

  public static filterRegions(filter: AwsIpRangesQuery['regions']): AwsIpRangesPluginOptions {
    return new AwsIpRangesPluginOptions({
      regions: filter,
      services: [],
      networkBorderGroups: [],
    });
  }

  public static filterServices(filter: AwsIpRangesQuery['services']): AwsIpRangesPluginOptions {
    return AwsIpRangesPluginOptions.filter({
      regions: [],
      services: filter,
      networkBorderGroups: [],
    });
  }

  public static filterNetworkBorderGroups(filter: AwsIpRangesQuery['networkBorderGroups']): AwsIpRangesPluginOptions {
    return AwsIpRangesPluginOptions.filter({
      regions: [],
      services: [],
      networkBorderGroups: filter,
    });
  }

  dummyValue = {
    ipv4: [{
      prefix: '127.0.0.1/32',
      service: 'PC2',
      region: 'aa-bbbb-0',
      networkBorderGroup: 'aa-bbbb-0',
    }],
    ipv6: [{
      prefix: '::1/128',
      service: 'PC2',
      region: 'aa-bbbb-0',
      networkBorderGroup: 'aa-bbbb-0',
    }],
  };
  provider = 'plugin';
  includeEnvironment = false;
  props: any;

  private constructor(filters: AwsIpRangesQuery) {
    this.props = {
      pluginName: AwsIpRangesPlugin.pluginName,
      ...filters,
    };
  }

}