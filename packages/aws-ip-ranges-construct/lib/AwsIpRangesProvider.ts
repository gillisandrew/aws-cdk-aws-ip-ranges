import { IpRangesJsonData } from "./IpRangesJsonData";
import type { Prefix } from "./types";
import { Token } from 'aws-cdk-lib'

export interface IpRangesData {
    syncToken: string;
    createDate: string;
    prefixes: {
        ip_prefix: string
        region: string
        service: string
        network_border_group: string
    }[]
}

export class AwsIpRangesProvider {
    private constructor() { }
    public static lookup(services: string[], regions: string[], networkBorderGroups: string[], path?: string): Prefix[] {
        [
            ...services,
            ...regions,
            ...networkBorderGroups
        ].forEach((value) => {
            if (Token.isUnresolved(value))
                throw new Error('Cannot perform an IP range lookup on unresolved token values.')
        })
        const data = IpRangesJsonData.get(path)
        const prefixes = (JSON.parse(data) as IpRangesData).prefixes
        return prefixes.filter(({ service, region, network_border_group }) => {
            if (services.length > 0 && !services.includes(service))
                return false;
            if (regions.length > 0 && !regions.includes(region))
                return false;
            if (networkBorderGroups.length > 0 && !networkBorderGroups.includes(network_border_group))
                return false;
            return true
        }).map<Prefix>(({ ip_prefix: ipPrefix, network_border_group: networkBorderGroup, ...prefix }) => ({
            ipPrefix,
            ...prefix,
            networkBorderGroup,
        }))
    }

}