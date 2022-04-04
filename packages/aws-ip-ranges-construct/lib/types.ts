export interface AwsIpRangeProps {
    regions?: string[];
    services?: string[];
    networkBorderGroups?: string[];
}
export interface Prefix {
    ipPrefix: string
    region: string
    service: string
    networkBorderGroup: string
}