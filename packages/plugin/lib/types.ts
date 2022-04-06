export interface AwsIpRangesQueryFilters {
  regions: string[]
  services: string[]
  networkBorderGroups: string[]
}

export interface AwsIpRangesQuery extends AwsIpRangesQueryFilters { }
export interface AwsIpRangesResult {
  syncToken: string
  ipv4: Prefix[]
  ipv6: Prefix[]
}

export interface Prefix {
  prefix: string
  region: string
  service: string
  networkBorderGroup: string
}
