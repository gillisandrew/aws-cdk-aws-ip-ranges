export interface AwsIpRangesQuery {
  regions: string[]
  services: string[]
  networkBorderGroups: string[]
}

export interface AwsIpRangesResult {
  ipv4: Prefix[]
  ipv6: Prefix[]
}

export interface Prefix {
  prefix: string
  region: string
  service: string
  networkBorderGroup: string
}
