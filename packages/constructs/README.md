# AWS IP Range Lookup Constructs

I built this little utility to easily filter the [published IP ranges](https://docs.aws.amazon.com/general/latest/gr/aws-ip-ranges.html) within an AWS CDK stack.

## Installation

```sh
npm i aws-ip-ranges-construct aws-ip-ranges-construct
```

## Usage

### Example

Add a security group rule to enable EC2 instance connect in the current region. Refer to [REFERENCE.md](./REFERENCE.md) to view some possible values.

```typescript
import { AwsIpRanges } from "aws-ip-ranges-construct";
// In your stack or construct
const ec2ConnectRanges = new AwsIpRanges(this, "EC2ConnectIpRanges", {
  regions: [Stack.of(this).region],
  services: ["EC2_INSTANCE_CONNECT"],
});

// Use in a security group rule
ec2ConnectRanges.prefixes.forEach(({ ipPrefix }) => {
  securityGroup.addIngressRule(ec2.Peer.ipv4(ipPrefix), ec2.Port.tcp(22));
});
```

### Handling Deterministic Builds

By default, the IP ranges will be downloaded every time the stack is synthesized. To change this behavior you can set the `aws-ip-ranges/json-file` [context value](https://docs.aws.amazon.com/cdk/v2/guide/context.html) to a path in your project. The construct will attempt to read from the file, if it does not exist it will be created.

To ensure your stack is synthesized the same, regardless of any changes AWS makes to the list, you should commit this file to source control.
