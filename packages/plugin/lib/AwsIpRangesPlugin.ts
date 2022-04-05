import type { Plugin, PluginHost } from 'aws-cdk/lib/api/plugin';
import { AwsIpRangesContextProvider } from './AwsIpRangesContextProvider';

export class AwsIpRangesPlugin implements Plugin {

  public static readonly pluginName = 'aws-ip-ranges-plugin';

  public readonly version = '1';


  public init(host: PluginHost): void {
    host.registerContextProviderAlpha(AwsIpRangesPlugin.pluginName, new AwsIpRangesContextProvider());
  }
}