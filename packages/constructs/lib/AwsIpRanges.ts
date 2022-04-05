import { Construct } from 'constructs';
import type { AwsIpRangesQuery, AwsIpRangesResult, Prefix } from 'aws-ip-ranges-plugin/lib/types';
import { ContextProvider } from 'aws-cdk-lib';
import { AwsIpRangesPlugin } from 'aws-ip-ranges-plugin/lib/plugin';

export type AwsIpRangesProps = Partial<AwsIpRangesQuery>

export class AwsIpRanges extends Construct implements AwsIpRangesResult {

    public ipv4: Prefix[];

    public ipv6: Prefix[];

    constructor(scope: Construct, id: string, props?: AwsIpRangesProps) {
        super(scope, id);

        const lookup = {
            regions: [],
            services: [],
            networkBorderGroups: [],
            ...props
        }

        Object.assign(this, ContextProvider.getValue(this, {
            provider: 'plugin',
            props: {
                pluginName: AwsIpRangesPlugin.pluginName,
                ...lookup
            },
            includeEnvironment: false,
            dummyValue: {
                ipv4: [{
                    prefix: '127.0.0.1/32'
                }],
                ipv6: [{
                    prefix: '::1/128'
                }]
            }
        }).value as AwsIpRangesResult)

    }
}
