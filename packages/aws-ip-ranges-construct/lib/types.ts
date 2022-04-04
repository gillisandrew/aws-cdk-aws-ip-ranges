export interface AwsIpRangeContextQuery {
    services?: string[];
    regions?: string[];
    networkBorderGroups?: string[];
}

export interface AwsIpRangeContextResponse {
    prefixes: PrefixList
}

export interface ContextProviderPlugin {
    getValue(args: { [key: string]: any }): Promise<any>;
}

export interface Prefix {
    ip_prefix: string
    region: string
    service: string
    network_border_group: string
}

export type PrefixList = Prefix[]

export interface IpRangesData {
    syncToken: string;
    createDate: string;
    prefixes: PrefixList
}
