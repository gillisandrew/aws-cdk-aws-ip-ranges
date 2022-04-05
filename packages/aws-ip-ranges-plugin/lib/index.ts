import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export interface AwsIpRangesPluginProps {
  // Define construct properties here
}

export class AwsIpRangesPlugin extends Construct {

  constructor(scope: Construct, id: string, props: AwsIpRangesPluginProps = {}) {
    super(scope, id);

    // Define construct contents here

    // example resource
    // const queue = new sqs.Queue(this, 'AwsIpRangesPluginQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
