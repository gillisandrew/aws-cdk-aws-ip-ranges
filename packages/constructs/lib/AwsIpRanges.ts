import { ContextProvider } from 'aws-cdk-lib';
import { AwsIpRangesPlugin } from 'aws-ip-ranges-plugin/lib/plugin';
import type { AwsIpRangesResult, Prefix } from 'aws-ip-ranges-plugin/lib/types';
import { Construct } from 'constructs';

export interface AwsIpRangesProps {
  /**
     * AWS services to filter the IP ranges on.
     * You can find possible values in [REFERENCE.md](https://github.com/gillisandrew/aws-cdk-aws-ip-ranges/blob/master/packages/constructs/REFERENCE.md#services)
     *
     * By default, all services are returned.
     * @default []
     */
  services?: string[];

  /**
     * AWS regions to filter the IP ranges on. If you want to scope the ranges to the current region you can pass the resolved region: `core.Stack.of(this).region`
     * You can find possible values in [REFERENCE.md](https://github.com/gillisandrew/aws-cdk-aws-ip-ranges/blob/master/packages/constructs/REFERENCE.md#regions)
     *
     * By default, all regions are returned.
     * @default []
     */
  regions?: string[];

  /**
     * AWS network border group to filter the IP ranges on.
     * You can find possible values in [REFERENCE.md](https://github.com/gillisandrew/aws-cdk-aws-ip-ranges/blob/master/packages/constructs/REFERENCE.md#network-border-groups)
     *
     * By default, all network border groups are returned.
     * @default []
     */
  networkBorderGroups?: string[];
}

/**
 * A simple construct that filters the published AWS IP ranges.
 *
 * It does not emit any resources into your CFN stack.
 * Instead it should be used to configure other resources with resolved IP values.
 */
export class AwsIpRanges extends Construct {

  public ipv4: Prefix[];

  public ipv6: Prefix[];

  constructor(scope: Construct, id: string, props?: AwsIpRangesProps) {
    super(scope, id);

    const filters = {
      regions: [],
      services: [],
      networkBorderGroups: [],
      ...props,
    };

    Object.assign(this, ContextProvider.getValue(this, {
      provider: 'plugin',
      props: {
        pluginName: AwsIpRangesPlugin.pluginName,
        ...filters,
      },
      includeEnvironment: false,
      dummyValue: {
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
      },
    }).value as AwsIpRangesResult);

  }
}
