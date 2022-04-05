import type { GetContextValueOptions } from 'aws-cdk-lib';
import { AwsIpRangesPlugin } from './plugin';
import { AwsIpRangesQuery } from './types';

export class AwsIpRangesPluginOptions implements GetContextValueOptions {

  public static filter(filters: AwsIpRangesQuery) {
    return new AwsIpRangesPluginOptions(filters);
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
  props = {
    pluginName: AwsIpRangesPlugin.pluginName,
  };
  includeEnvironment = false;

  private constructor(filters: AwsIpRangesQuery) {
    this.props = {
      ...this.props,
      ...filters,
    };
  }

}