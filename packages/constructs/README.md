# AWS IP Range Lookup Constructs

I built this little utility to easily filter the
[published IP ranges](https://docs.aws.amazon.com/general/latest/gr/aws-ip-ranges.html)
within an AWS CDK stack.

## Installation

1. Install the construct and plugin

```sh
npm i aws-ip-ranges-construct aws-ip-ranges-plugin
```

2. Register the plugin in `cdk.json`

```json
{
  "app": "npx ts-node --prefer-ts-exts bin/demo.ts",
  "plugin": ["aws-ip-ranges-plugin"]
  // ...
}
```

## Usage

### Example

Add a security group rule to enable EC2 instance connect in the
current region. Refer to [REFERENCE.md](./REFERENCE.md) to view some
possible values.

```typescript
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

### Handling Deterministic Builds

Like first-party context providers, lookups are cached in
`cdk.context.json` of your CDK project. If you need reproducible
builds, you should commit this file. to source control.
