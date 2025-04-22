module.exports = [
  {
    title: "Security",
    href: "security",
    filePath: "index.md",
    excerpt:
      "Learn how your Timescale instance is secured",
    children: [
      {
        title: "About security in Timescale Cloud",
        href: "overview",
        excerpt: "Get an overview of Timescale security",
      },
      {
        title: "Client credentials",
        href: "client-credentials",
        excerpt: "Client credentials to programmatically access your Timescale account",
      },
      {
        title: "Connect with a stricter SSL mode",
        href: "strict-ssl",
        excerpt:
          "Connect to Timescale with a stricter SSL mode of verify-ca or verify-full",
      },
      {
        title: "Multi-factor Authentication",
        href: "multi-factor-authentication",
        excerpt: "Multi-factor authentication for your Timescale account",
      },
      {
        title: "Read only role",
        href: "read-only-role",
        excerpt: "Create a read-only role to access your database",
      },
      {
        title: "SAML authentication",
        href: "saml",
        excerpt: "SAML / SSO authentication for your Timescale account",
      },
      {
        title: "VPC Peering and AWS PrivateLink",
        href: "vpc",
        excerpt: "Secure your Timescale Service with VPC Peering and AWS PrivateLink",
      },
    ],
  },
];

