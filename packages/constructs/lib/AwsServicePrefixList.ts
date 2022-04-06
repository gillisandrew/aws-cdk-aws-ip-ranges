import { Resource } from 'aws-cdk-lib';
import { CfnPrefixList, CfnPrefixListProps } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { AwsIpRanges } from '.';

export interface AwsServicePrefixListProps extends Partial<CfnPrefixListProps> {
  prefixListName: string
  addressFamily: 'IPv4' | 'IPv6'
  /**
   * The AWS service you wish to create the prefix list for.
   * @example "S3"
   */
  service: string
  /**
   * Regions to scope the ip ranges to. Omit or pass an empty array to get all regions.
   * @example [Stack.of(this).region] // Current region only
   */
  regions?: string[]
}

export class AwsServicePrefixList extends Resource {
  public readonly prefixList: CfnPrefixList;

  public readonly prefixListId: string;

  constructor(scope: Construct, id: string, props: AwsServicePrefixListProps) {
    super(scope, id);

    const ranges = new AwsIpRanges(scope, 'AwsServiceRange', {
      regions: props.regions || [],
      services: [props.service],
    });

    const range = props.addressFamily === 'IPv6' ? ranges.ipv6 : ranges.ipv4;

    this.prefixList = new CfnPrefixList(this, 'Resource', {
      prefixListName: props.prefixListName,
      addressFamily: props.addressFamily,
      maxEntries: range.length,
      entries: range.map(({ prefix: cidr }) => ({
        cidr,
      })),
    });

    this.node.defaultChild = this.prefixList;
    this.prefixListId = this.prefixList.ref;
  }
}
