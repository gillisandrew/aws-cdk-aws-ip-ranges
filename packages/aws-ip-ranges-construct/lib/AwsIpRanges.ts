import { Construct } from 'constructs';
import { AwsIpRangesProvider } from './AwsIpRangesProvider';
import type { AwsIpRangeProps, Prefix } from './types';


export class AwsIpRanges extends Construct {
    public prefixes: Prefix[]
    constructor(scope: Construct, id: string, props?: AwsIpRangeProps) {
        super(scope, id);

        const { regions, services, networkBorderGroups } = {
            regions: [],
            services: [],
            networkBorderGroups: [],
            ...props
        }
        this.prefixes = AwsIpRangesProvider.lookup(
            services,
            regions,
            networkBorderGroups,
            this.node.tryGetContext('aws-ip-ranges/json-file')
        )
    }
}
