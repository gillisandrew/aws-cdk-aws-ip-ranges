# EXPERIMENTAL: AWS IP Ranges Context Provider Plugin

An experimental plugin to dynamically fetch and filter the
published IP ranges for AWS services within a CDK app.

It is based off the example specified in the comments of the [plugins API](https://github.com/aws/aws-cdk/blob/16d293d028b491743a9b6520086181efc1e00193/packages/aws-cdk/lib/api/plugin/plugin.ts#L114)

## Installation

1. Install the plugin

```sh
npm i aws-ip-ranges-construct aws-ip-ranges-plugin
```

2. Register the plugin in `cdk.json`

```json
{
  "app": "npx ts-node --prefer-ts-exts bin/app.ts",
  "plugins": ["aws-ip-ranges-plugin"]
}
```

## Usage

```ts
import { ContextProvider } from "aws-cdk-lib";
import { AwsIpRangesPluginOptions } from "aws-ip-ranges-plugin/lib/plugin";
import type { AwsIpRangesResult } from "aws-ip-ranges-plugin/lib/types";

const filters = {
  regions: ["us-east-1"],
  services: ["EC2_INSTANCE_CONNECT"],
};

const ranges = ContextProvider.getValue(
  this,
  AwsIpRangesPluginOptions.filter(filters)
).value as AwsIpRangesResult;
```
