import { AwsIpRangesQuery } from './types';
export class AwsIpRangesPluginOptions {

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

  constructor(filters: AwsIpRangesQuery) {
    this.props = {
      pluginName: 'aws-ip-ranges-plugin',
      ...filters,
    };
  }

}