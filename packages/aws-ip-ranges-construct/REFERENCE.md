# Reference

Published IP ranges values for reference.

## Services

```
jq '.prefixes[] | .service' -r < ip-ranges.json | sort -u
```

- `AMAZON`
- `AMAZON_APPFLOW`
- `AMAZON_CONNECT`
- `API_GATEWAY`
- `CHIME_MEETINGS`
- `CHIME_VOICECONNECTOR`
- `CLOUD9`
- `CLOUDFRONT`
- `CLOUDFRONT_ORIGIN_FACING`
- `CODEBUILD`
- `DYNAMODB`
- `EBS`
- `EC2`
- `EC2_INSTANCE_CONNECT`
- `GLOBALACCELERATOR`
- `KINESIS_VIDEO_STREAMS`
- `ROUTE53`
- `ROUTE53_HEALTHCHECKS`
- `ROUTE53_HEALTHCHECKS_PUBLISHING`
- `ROUTE53_RESOLVER`
- `S3`
- `WORKSPACES_GATEWAYS`

## Regions

```
jq '.prefixes[] | .region' -r < ip-ranges.json | sort -u
```

- `GLOBAL`
- `af-south-1`
- `ap-east-1`
- `ap-northeast-1`
- `ap-northeast-2`
- `ap-northeast-3`
- `ap-south-1`
- `ap-south-2`
- `ap-southeast-1`
- `ap-southeast-2`
- `ap-southeast-3`
- `ap-southeast-4`
- `ca-central-1`
- `cn-north-1`
- `cn-northwest-1`
- `eu-central-1`
- `eu-central-2`
- `eu-north-1`
- `eu-south-1`
- `eu-south-2`
- `eu-west-1`
- `eu-west-2`
- `eu-west-3`
- `il-central-1`
- `me-central-1`
- `me-south-1`
- `sa-east-1`
- `us-east-1`
- `us-east-2`
- `us-gov-east-1`
- `us-gov-west-1`
- `us-west-1`
- `us-west-2`

## Network Border Groups

```
jq '.prefixes[] | .network_border_group' -r < ip-ranges.json | sort -u
```

- `GLOBAL`
- `af-south-1`
- `ap-east-1`
- `ap-northeast-1`
- `ap-northeast-2`
- `ap-northeast-3`
- `ap-south-1`
- `ap-south-1-ccu-2`
- `ap-south-1-del-2`
- `ap-south-2`
- `ap-southeast-1`
- `ap-southeast-2`
- `ap-southeast-3`
- `ap-southeast-4`
- `ca-central-1`
- `cn-north-1`
- `cn-northwest-1`
- `eu-central-1`
- `eu-central-2`
- `eu-north-1`
- `eu-south-1`
- `eu-south-2`
- `eu-west-1`
- `eu-west-2`
- `eu-west-3`
- `il-central-1`
- `me-central-1`
- `me-south-1`
- `sa-east-1`
- `us-east-1`
- `us-east-1-atl-1`
- `us-east-1-bos-1`
- `us-east-1-chi-1`
- `us-east-1-dfw-1`
- `us-east-1-iah-1`
- `us-east-1-mci-1`
- `us-east-1-mia-1`
- `us-east-1-msp-1`
- `us-east-1-nyc-1`
- `us-east-1-phl-1`
- `us-east-1-pilot-3`
- `us-east-1-pilot-4`
- `us-east-1-pilot-5`
- `us-east-1-pilot-6`
- `us-east-2`
- `us-gov-east-1`
- `us-gov-west-1`
- `us-west-1`
- `us-west-2`
- `us-west-2-den-1`
- `us-west-2-las-1`
- `us-west-2-lax-1`
- `us-west-2-pdx-1`
- `us-west-2-phx-1`
- `us-west-2-pilot-1`
- `us-west-2-pilot-2`
- `us-west-2-pilot-3`
- `us-west-2-sea-1`
