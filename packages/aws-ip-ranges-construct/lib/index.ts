import { ContextProvider, Stack, Token } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AwsIpRangeContextResponse, PrefixList } from './types';

export interface AwsIpRangeProps {
  regions?: string[];
  services?: string[];
  networkBorderGroups?: string[];
}

export class AwsIpRange extends Construct {
  public prefixes: PrefixList
  constructor(scope: Construct, id: string, props: AwsIpRangeProps) {
    super(scope, id);
    this.prefixes = ContextProvider.getValue(scope, {
      provider: 'aws-ip-range',
      props: { ...props },
      dummyValue: {
        prefixes: [{
          ip_prefix: 'NONE',
          region: 'NONE',
          network_border_group: 'NONE',
          service: 'NONE',
        }]
      } as AwsIpRangeContextResponse,
    }).value;
  }
}
