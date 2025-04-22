---
title: About security in Timescale Cloud
excerpt: Get an overview of security on Timescale
products: [cloud]
keywords: [security]
tags: [encryption, VPC, privacy]
---

# Security overview

<Tabs label="Platforms">

<Tab title="Timescale Cloud">

Timescale implements a variety of secure software engineering practices in TimescaleDB, including code static analysis
for security hardening, automated scanning for dependency vulnerabilities, and code security reviews.
Additionally, Timescale has developed the https://github.com/timescale/pgspot open-source extension that we
use to identify security issues with Postgres extensions. This has helped tighten our security posture.
Timescale products do not have any identified weaknesses.

This page lists the additional things we do to ensure operational security and to lock-down Timescale Cloud services.
To see our security features at a glance, see [Security at Timescale][security-at-timescale].

## Data encryption

Your data on Timescale Cloud is encrypted both in transit and at rest. Both active
databases and backups are encrypted.

Timescale Cloud uses AWS as its cloud provider, with all the security that AWS
provides. Data encryption uses the industry-standard AES-256 algorithm.
Cryptographic keys are managed by
[AWS Key Management Service (AWS KMS)][aws-kms]. Keys are never stored in plaintext.

For more information about AWS security, see the AWS documentation on security
in [Amazon Elastic Compute Cloud][ec2-security] and
[Elastic Block Storage][ebs-security].

## Networking security

Customer access to Timescale Cloud services is only provided over TLS-encrypted
connections. There is no option to use unencrypted plaintext connections.

## Networking with Virtual Private Cloud (VPC) peering

When using VPC peering, **no public Internet-based access** is provided to the
services. Service addresses are published in public DNS, but they can only be
connected to from the customer's peered VPC using private network addresses.

VPC peering only enables communication to be initiated from your Customer VPC to
Timescale Cloud services running in the Timescale VPC. Timescale cannot initiate
communication with your VPC. To learn how to set up VPC Peering, see
[Secure your Timescale Service with VPC Peering and AWS PrivateLink][vpc-peering].

## Operator access

Normally all the resources required for providing Timescale Cloud services are
automatically created, maintained and terminated by the Timescale
infrastructure. No manual operator intervention is required.

However, the Timescale Operations Team has the capability to securely
log in to the service Virtual Machines for troubleshooting purposes. These
accesses are audit logged.

No customer access to the virtual machine level is provided.

## Customer data privacy

Customer data privacy is of utmost importance at Timescale. By default, your
Timescale data is encrypted both in transit and at rest. To do this,
Timescale uses various technical mechanisms, processes, and software development
lifecycle practices, to help ensure the security and privacy of your data.

Timescale complies with the European Union's General Data Protection Regulation
(GDPR), and all practices are covered by the
[Timescale Privacy Policy][timescale-privacy-policy]
and the [Timescale Terms of Service][tsc-tos]. All customer data is
processed in accordance with Timescale's GDPR-compliant
[Data Processor Addendum][tsc-data-processor-addendum],
which applies to all Timescale customers.

Timescale operators never access customer data, unless explicitly requested by
the customer to troubleshoot a technical issue. The Timescale operations team
has mandatory recurring training regarding the applicable policies.

[timescale-privacy-policy]: https://www.timescale.com/legal/privacy
[tsc-tos]: https://www.timescale.com/legal/timescale-cloud-terms-of-service
[tsc-data-processor-addendum]: https://www.timescale.com/legal/timescale-cloud-data-processing-addendum
[aws-kms]: https://aws.amazon.com/kms/
[ec2-security]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/data-protection.html
[ebs-security]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html
[vpc-peering]: /use-timescale/:currentVersion:/vpc
[security-at-timescale]: https://www.timescale.com/security

</Tab> 

<Tab title="MST">

## Cloud provider accounts

Managed Service for TimescaleDB services are hosted by cloud provider
accounts controlled by Timescale. These accounts are managed only by Timescale
and Aiven operations personnel. Members of the public cannot directly access the
cloud provider account resources.

## Virtual machines

Your Managed Service for TimescaleDB services are located on one or more virtual
machines. Each virtual machine is dedicated to a single customer, and are never
multi-tenanted. Customer data never leaves the virtual machine, except when
uploaded to an offsite backup location.

When you create a new service, you need to select a cloud region. When the
virtual machine is launched, it does so in the cloud region you have chosen.
Your data never leaves the chosen cloud region.

If a cloud region has multiple Availability Zones, or a similar
high-availability mechanism, the virtual machines are distributed evenly across
the zones. This provides the best possible service if an Availability Zone
becomes unavailable.

Access to the virtual machine providing your service is restricted. Software
that is accessing your database needs to run on a different virtual machine. To
reduce latency, it is best for it to be using a virtual machine provided by the
same cloud provider, and in the same region, if possible.

Virtual machines are not reused. They are terminated and wiped when you upgrade
or delete your service.

## Project security

Every Managed Service for TimescaleDB project has its own certificate authority.
This certificate authority is used to sign certificates used internally by your
services to communicate between different cluster nodes and to management
systems.

You can download your project certificate authority in the Managed Service for
TimescaleDB portal. In the `Services` tab, click the service you want to find
the certificate for. In the service `Overview` tab, under `Connection
information`, locate the `CA Certificate` section, and click `Show` to see the
certificate. It is recommended that you set up your browser or client to trust
that certificate.

All server certificates are signed by the Managed Service for TimescaleDB
project certificate authority.

## Data encryption

Managed Service for TimescaleDB at-rest data encryption covers both active
service instances as well as service backups in cloud object storage.

Service instances and the underlying virtual machines use full volume
encryption. The encryption method uses LUKS, with a randomly generated ephemeral
key per each instance, and per volume. The keys are never re-used, and are
disposed of when the instance is destroyed. This means that a natural key
rotation occurs with roll-forward upgrades. By default, the LUKS mode is
`aes-xts-plain64:sha256`, with a 512-bit key.

Backups are encrypted with a randomly generated key per file. These keys are in
turn encrypted with an RSA key-encryption key-pair, and stored in the header
section of each backup segment. The file encryption is performed with AES-256 in
CTR mode, with HMAC-SHA256 for integrity protection. The RSA key-pair is
randomly generated for each service. The key lengths are 256-bit for block
encryption, 512-bit for the integrity protection, and 3072-bits for the RSA key.

Encrypted backup files are stored in the object storage in the same region that
the virtual machines are located for the service.

## Networking security

Access to provided services is only provided over TLS encrypted connections. TLS
ensures that third-parties can't eavesdrop or modify the data while it's in
transit between your service and the clients accessing your service. You cannot
use unencrypted plain text connections.

Communication between virtual machines within Managed Service for TimescaleDB is
secured with either TLS or IPsec. You cannot use unencrypted plaintext
connections.

Virtual machines network interfaces are protected by a dynamically configured
firewall based on iptables, which only allows connections from specific
addresses. This is used for network traffic from the internal network to other
VMs in the same service, and for external public network, to client connections.

By default, new services accept incoming traffic from all sources, which is
used to simplify initial set up of your service. It is highly recommended that
you restrict the IP addresses that are allowed to establish connections to your
services.

<Procedure>

### Configure allowed incoming IP addresses for your service

1.  In [MST Portal][mst-login], select the service to update.
1.  In `Overview` check the `Port` number.

    This is the port that you are managing inbound access for.
1.  In `Network`, check `IP filters`. The default value is `Open for all.

1. Click the ellipsis (...) to the right of Network, then select `Set public IP filters`.

1. Set the `Allowed inbound IP addresses`:

   <img class="main-content__illustration"
   src="https://assets.timescale.com/docs/images/mst/set-allowed-ip-addresses.png"
   alt="Add a new allowed incoming IP address for Managed Service for TimescaleDB services"/>

</Procedure>

## Networking with VPC peering

When you set up VPC peering, you cannot access your services using public
internet-based access. Service addresses are published in the public DNS record,
but they can only be connected to from your peered VPC network using private
network addresses.

The virtual machines providing your service are hosted by cloud provider
accounts controlled by Timescale.

## Customer data privacy

Customer data privacy is of utmost importance at Timescale. Timescale works with
Aiven to provide Managed Service for TimescaleDB.

In most cases, all the resources required for providing your services are
automatically created, maintained, and terminated by the Managed Service for
TimescaleDB infrastructure, with no manual operator intervention required.

The Timescale Operations Team are able to securely log in to your service
Virtual Machines, for the purposes of troubleshooting, as required. Timescale
operators never access customer data unless you explicitly request them to do
so, to troubleshoot a technical issue. This access is logged and audited.

There is no ability for any customer or member of the public to access any
virtual machines used in Managed Service for TimescaleDB.

Managed Service for TimescaleDB services are periodically assessed and penetration
tested for any security issues by an independent professional cyber-security vendor.

<!---
The most
recent evaluation report
[is available for download][cloud-security-eval].
This link is currently timing out.
-->

Aiven is fully GDPR-compliant, and has executed data processing agreements
(DPAs) with relevant cloud infrastructure providers. If you require a DPA, or if
you want more information about information security policies,
[contact Timescale][timescale-support].

<!---
[cloud-security-eval]: https://www.elfgroup.fi/ecc/1708-S6-71acd0046.pdf
-->

[timescale-support]: https://www.timescale.com/contact/
[mst-login]:https://portal.managed.timescale.com/login

</Tab>
<Tab title="Self-hosted">

Roll your own,

</Tab>

</Tabs>


