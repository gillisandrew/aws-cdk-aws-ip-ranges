import { Plugin, PluginHost } from 'aws-cdk/lib/api/plugin'
import { AwsIpRangesContextProvider } from './AwsIpRangesContextProvider';

export class AwsIpRangesPlugin implements Plugin {
    public readonly version = '1';
    public readonly pluginName = 'aws-ip-ranges-plugin'
    public init(host: PluginHost): void {
        host.registerContextProviderAlpha(this.pluginName, new AwsIpRangesContextProvider());
    }
}