import * as cdk from 'aws-cdk-lib';
import { AwsIpRanges } from '../lib/index';

// example test. To run these tests, uncomment this file along with the
// example resource in lib/index.ts
let app: cdk.App;
let stack: cdk.Stack;

beforeEach(() => {
  app = new cdk.App();
  stack = new cdk.Stack(app, 'TestStack', {
    env: {
      region: 'us-east-1',
      account: '12345678910',
    },
  });
});

test('It handles optional props.', () => {
  new AwsIpRanges(stack, 'MyTestConstruct');
});
