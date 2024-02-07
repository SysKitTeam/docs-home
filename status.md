---
description: This article provides information about Syskit systems' operationality.
---

# System Status

{% hint style="success" %}
All Systems Operational
{% endhint %}

## Syskit Systems

| System                           | Status      |
| -------------------------------- | ----------- |
| **Website**                      | Operational |
| **Syskit Point Cloud Instances** | Operational |
| **Subscriptions Portal**         | Operational |

[Report a security incident](report-security-incident.md)

## Past Incidents

#### Feb 5, 2023
**Customers are unable to connect new Point trial instances and purchase plans.**
* Feb 5, 17:30 UTC **Identified** - Downtime of a 3rd party provider causes errors when customers try to connect to a trial instance or try to purchase a plan. Both actions require creating a license by a 3rd party provider, which is currently not possible. We are monitoring licensed Point instances and are working on resolving the issue with the 3rd party provider.
* Feb 7, 08:15 UTC **Resolved** - After recovery of 3rd party provider services, additional changes were performed in our systems to recover all functionality.  Creating a license is working again, meaning customers can connect to trial instances and purchase plans without issues.

#### January 29, 2024
**Customers cannot access Subscriptions Portal**
* January 29, 10:58 UTC **Identified** - Subscriptions Portal cannot be accessed. An attempt to do so results in a timeout error. Additionally, new customers can not connect their tenants to Point instances since the Subscriptions Portal app is utilized for this process. We are working on resolving the issue as soon as possible.
* January 29, 12:45 UTC **Resolved** - Subscriptions Portal app services are restored. Customers can access the Subscriptions Portal app and connect their tenants to empty Point trial instances.

#### January 21, 2024
**Syskit Point instaces are unavailable due to Microsoft services unavailability.**
* January 21, 01:57 UTC **Identified** - Azure Portal, Azure Key Vault, and other Microsoft services are not accessible, resulting in Syskit Point instances unavailability. 
* January 21, 08:00 UTC **Status update** - The impact has been mitigated for most regions, except for West Europe. 
* January 21, 08:58 UTC **Resolved** - Microsoft services returned to a healthy status. As a result, Syskit Point instances can be accessed again.

#### January 16, 2024
**Syskit Point is unable to process and collect Unified Audit Logs.**
* January 16, 17:20 UTC **Resolved** - No further issues were detected when sending requests to retrieve Unified Audit Logs.
* January 16, 12:03 UTC **Identified** - API requests sent to retrieve Unified Audit Logs are failing, resulting in Audit Logs not being processed and collected. The issue is restricted to the Europe region. We're working with third-party vendors to resolve the issue.


#### November 2, 2023
**Customers might be unable to provision free-trial instances through the Subscriptions Portal**
* November 6, 23:17 UTC **Resolved** - The issue was resolved by external service provider.
* November 2, 11:54 UTC **Identified** - Due to external service provider issues, customers can expect to experience issues when trying to connect their M365 tenant to a Syskit Point free trial instance. The problem is related to a DNS support outage resulting in an inability to provision the Point instance with the desired domain name.

#### August 30, 2023
**Syskit Point instances in the Australia region not available**
* August 31 **Resolved** - The problem was resolved.
* August 30, 8:30 UTC **Identified** - Syskit Point instances are not available due to a utility power surge in the Australia East region, affecting multiple Azure services.