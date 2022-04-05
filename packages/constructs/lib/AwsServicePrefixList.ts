import { Resource } from "aws-cdk-lib";
import { CfnPrefixList } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";
import { AwsIpRanges } from "./AwsIpRanges";

export interface AwsServicePrefixListProps {
    prefixListName: string;
    addressFamily: 'IPv4' | 'IPv6';
    service: string;
    regions?: string[]
}

export class AwsServicePrefixList extends Resource {

    public readonly prefixList: CfnPrefixList;

    public readonly prefixListId: string;

    constructor(scope: Construct, id: string, props: AwsServicePrefixListProps) {
        super(scope, id)

        const ranges = new AwsIpRanges(scope, 'AwsServiceRange', {
            regions: props.regions || [],
            services: [props.service],
        });

        const range = props.addressFamily === 'IPv6' ? ranges.ipv6 : ranges.ipv4

        this.prefixList = new CfnPrefixList(this, 'Resource', {
            prefixListName: props.prefixListName,
            addressFamily: props.addressFamily,
            maxEntries: range.length,
            entries: range.map(({ prefix: cidr }) => ({
                cidr,
            })),
        });

        this.node.defaultChild = this.prefixList;
    }


}