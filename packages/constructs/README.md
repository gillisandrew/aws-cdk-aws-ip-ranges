# AWS IP Ranges Constructs

A simple construct to filter the
[published IP ranges](https://docs.aws.amazon.com/general/latest/gr/aws-ip-ranges.html)
within an AWS CDK stack.

## Installation

1. Install the construct and plugin

```bash
npm i aws-ip-ranges-construct aws-ip-ranges-plugin
```

2. Register the plugin in `cdk.json`

```js
{
  "app": "npx ts-node --prefer-ts-exts bin/app.ts",
  "plugin": ["aws-ip-ranges-plugin"]
  // ...
}
```

## Usage

### Example

### Security Group Rule

Add a security group rule to enable EC2 instance connect in the
current region. Refer to [REFERENCE.md](./REFERENCE.md) to view some
possible values.

```ts
import { AwsIpRanges } from "aws-ip-ranges-construct";
// Create in your stack or construct
const ec2ConnectRanges = new AwsIpRanges(this, "EC2ConnectIpRanges", {
  regions: [Stack.of(this).region],
  services: ["EC2_INSTANCE_CONNECT"],
});

// Use in a security group rule
ec2ConnectRanges.ipv4.forEach(({ prefix }) => {
  securityGroup.addIngressRule(ec2.Peer.ipv4(prefix), ec2.Port.tcp(22));
});
```

### L2 AwsServicePrefixList Construct

```ts
import { Resource } from "aws-cdk-lib";
import { CfnPrefixList } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";
import { AwsIpRanges } from "aws-ip-ranges-construct";

export interface AwsServicePrefixListProps {
  prefixListName: string;
  addressFamily: "IPv4" | "IPv6";
  service: string;
  regions?: string[];
}

export class AwsServicePrefixList extends Resource {
  public readonly prefixList: CfnPrefixList;

  public readonly prefixListId: string;

  constructor(scope: Construct, id: string, props: AwsServicePrefixListProps) {
    super(scope, id);

    const ranges = new AwsIpRanges(scope, "AwsServiceRange", {
      regions: props.regions || [],
      services: [props.service],
    });

    const range = props.addressFamily === "IPv6" ? ranges.ipv6 : ranges.ipv4;

    this.prefixList = new CfnPrefixList(this, "Resource", {
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
```

### Handling Deterministic Builds

Like first-party context providers, lookups are cached in
`cdk.context.json` of your CDK project. If you need reproducible
builds, you should commit this file to source control.
