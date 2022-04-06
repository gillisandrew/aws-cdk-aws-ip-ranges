import type { Plugin, PluginHost } from 'aws-cdk/lib/api/plugin';
import { AwsIpRangesContextProvider } from './AwsIpRangesContextProvider';
import { AwsIpRangesPluginOptions } from './AwsIpRangesPluginOptions';
import { AwsIpRangesQuery } from './types';

export class AwsIpRangesPlugin implements Plugin {

  public readonly pluginName = 'aws-ip-ranges-plugin';
  public readonly version = '1';

  public init(host: PluginHost): void {
    host.registerContextProviderAlpha(this.pluginName, new AwsIpRangesContextProvider());
  }

  public query(query: AwsIpRangesQuery): AwsIpRangesPluginOptions {
    return new AwsIpRangesPluginOptions(query);
  }

}