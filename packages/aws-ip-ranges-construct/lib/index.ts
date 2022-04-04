import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export interface AwsCdkAwsIpRangeProps {
  // Define construct properties here
}

export class AwsCdkAwsIpRange extends Construct {

  constructor(scope: Construct, id: string, props: AwsCdkAwsIpRangeProps = {}) {
    super(scope, id);

    // Define construct contents here

    // example resource
    // const queue = new sqs.Queue(this, 'AwsCdkAwsIpRangeQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
