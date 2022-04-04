import * as cdk from 'aws-cdk-lib';
import { existsSync } from 'fs';
import { AwsIpRanges } from '../lib/index';

// example test. To run these tests, uncomment this file along with the
// example resource in lib/index.ts
let app: cdk.App;
let stack: cdk.Stack;

beforeEach(() => {
    app = new cdk.App()
    stack = new cdk.Stack(app, 'TestStack')
})

test('It handles optional props.', () => {
    new AwsIpRanges(stack, 'MyTestConstruct');
});

test('It reads ip-ranges.json file location from context', () => {
    stack.node.setContext('aws-ip-ranges/json-file', './.cache/ip-ranges.json')
    new AwsIpRanges(stack, 'MyTestConstruct');
    expect(existsSync('./.cache/ip-ranges.json'))
})
test('It filters on regions.', () => {
    stack.node.setContext('aws-ip-ranges/json-file', './.cache/ip-ranges.json')
    const regions = ['us-east-1', 'ca-central-1']
    const ranges = new AwsIpRanges(stack, 'MyTestConstruct', {
        regions
    });
    expect(ranges.prefixes.reduce<boolean>((acc, { region }) =>
        acc && !!regions.includes(region)
        , true))
})
