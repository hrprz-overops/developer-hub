// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

const sidebars = {
  allcontent: [
    // Tutorial Link from Docs
    {
      type: "link",
      label: "Tutorials",
      href: "/tutorials",
    },
    // Documentation Parent
    {
      type: "category",
      label: "Documentation",
      link: {
        type: "doc",
        id: "index",
      },
      collapsed: true,
      items: [
        {
          type: "category",
          label: "Get Started",
          link: {
            type: "doc",
            id: "get-started",
          },
          customProps: {
            description: "Learn Harness fundamentals and key concepts.",
          },
          collapsed: true,
          items: [{ type: "autogenerated", dirName: "get-started" }],
        },
        // Code Repository Landing Page
        {
          type: "category",
          label: "Code Repository",
          link: {
            type: "doc",
            id: "code-repository",
          },
          customProps: {
            description: "Manage code in Harness, and accelerate development with security at scale. (Beta)",
          },
          collapsed: true,
          items: [{ type: "autogenerated", dirName: "code-repository" }],
        },
        // Continuous Integration landing page
        {
          type: "category",
          label: "Continuous Integration",
          link: {
            type: "doc",
            id: "continuous-integration",
          },
          customProps: {
            description:
              "Learn how you can build faster and be more productive.",
          },
          collapsed: true,
          items: [{ type: "autogenerated", dirName: "continuous-integration" }],
        },
        // Continuous Delivery Landing Page
        {
          type: "category",
          label: "Continuous Delivery & GitOps",
          link: {
            type: "doc",
            id: "continuous-delivery",
          },
          customProps: {
            description:
              "Learn how to make your software releases more efficient and reliable.",
          },
          collapsed: true,
          items: [{ type: "autogenerated", dirName: "continuous-delivery" }],
        },
        {
          type: "category",
          label: "Infrastructure as Code Management",
          link: {
            type: "doc",
            id: "infrastructure-as-code-management",
          },
          customProps: {
            description:
              "Get started with Harness Infrastructure as Code Management",
          },
          collapsed: true,
          items: [
            {
              type: "autogenerated",
              dirName: "infra-as-code-management",
            },
          ],
        },
        // Feature Flags Landing Page
        {
          type: "category",
          label: "Feature Flags",
          link: {
            type: "doc",
            id: "feature-flags",
          },
          customProps: {
            description:
              "Learn how to change your software's functionality without deploying new code.",
          },
          collapsed: true,
          items: [{ type: "autogenerated", dirName: "feature-flags" }],
        },
        // Cloud Cost Management Landing Page
        {
          type: "category",
          label: "Cloud Cost Management",
          link: {
            type: "doc",
            id: "cloud-cost-management",
          },
          customProps: {
            description: "Learn how to manage and optimize cloud costs.",
          },
          collapsed: true,
          items: [{ type: "autogenerated", dirName: "cloud-cost-management" }],
        },
        {
          type: "category",
          label: "Security Testing Orchestration",
          link: {
            type: "doc",
            id: "security-testing-orchestration",
          },
          customProps: {
            description: "Learn how to left shift your security testing.",
          },
          collapsed: true,
          items: [
            {
              type: "autogenerated",
              dirName: "security-testing-orchestration",
            },
          ],
        },
        // SSCA
        {
          type: "category",
          label: "Software Supply Chain Assurance",
          link: {
            type: "doc",
            id: "software-supply-chain-assurance",
          },
          customProps: {
            description:
              "Learn how to secure your software supply chain.",
          },
          collapsed: true,
          items: [{ type: "autogenerated", dirName: "software-supply-chain-assurance" }],
        },
        {
          type: "category",
          label: "Chaos Engineering",
          link: {
            type: "doc",
            id: "chaos-engineering",
          },
          customProps: {
            description: "Learn how to build and validate resilience.",
          },
          collapsed: true,
          items: [
            {
              type: "autogenerated",
              dirName: "chaos-engineering",
            },
          ],
        },
        // SSCA

         // Service Reliability Management Page
         {
          type: "category",
          label: "Service Reliability Management",
          link: {
            type: "doc",
            id: "service-reliability-management",
          },
          customProps: {
            description:
              "Learn how to use real-time insights to improve the reliability of applications and services.",
          },
          collapsed: true,
          items: [
            {
              type: "autogenerated",
              dirName: "service-reliability-management",
            },
          ],
        },
        // Continuous Error Tracking landing page
        {
          type: "category",
          label: "Continuous Error Tracking",
          link: {
            type: "doc",
            id: "continuous-error-tracking",
          },
          customProps: {
            description:
              "Learn how you can identify, triage, and resolve errors in applications.",
          },
          collapsed: true,
          items: [
            {
              type: "autogenerated",
              dirName: "continuous-error-tracking",
            },
          ],
        },
        {
          type: "category",
          label: "Internal Developer Portal",
          link: {
            type: "doc",
            id: "internal-developer-portal",
          },
          customProps: {
            description:
              "Get started with Harness Internal Developer Portal",
          },
          collapsed: true,
          items: [
            {
              type: "autogenerated",
              dirName: "internal-developer-portal",
            },
          ],
        },
         // SEI
        {
          type: "category",
          label: "Software Engineering Insights",
          link: {
            type: "doc",
            id: "software-engineering-insights",
          },
          customProps: {
            description: "Learn how data-led insights can remove bottlenecks and improve productivity.",
          },
          collapsed: true,
          items: [
            {
              type: "autogenerated",
              dirName: "software-engineering-insights",
            },
          ],
        },
        // Platform Landing Page
        {
          type: "category",
          label: "Platform",
          link: {
            type: "doc",
            id: "platform",
          },
          customProps: {
            description:
              "Learn how to manage Harness features that integrate with all modules.",
          },
          collapsed: true,
          items: [
            {
              type: "autogenerated",
              dirName: "platform",
            },
          ],
        },
        // SMP landing page
        {
          type: "category",
          label: "Self-Managed Enterprise Edition",
          link: {
            type: "doc",
            id: "self-managed-enterprise-edition",
          },
          customProps: {
            description:
              "Learn how to use this end-to-end solution for continuous, self-managed delivery.",
          },
          collapsed: true,
          items: [
            {
              type: "autogenerated",
              dirName: "self-managed-enterprise-edition",
            },
          ],
        },
        {

          type: "category",
          label: "Harness FirstGen",
          link: {
            type: "generated-index",
            slug: "/first-gen",
          },
          customProps: {
            description: "Learn how to use Harness FirstGen modules.",
          },
          collapsed: true,
          items: [
            {
              type: "autogenerated",
              dirName: "first-gen",
            },
          ],
        },
        // Release Notes
        {
          type: "link",
          label: "Release Notes",
          href: "/release-notes",
          customProps: {
            description: "Learn about recent changes to Harness products.",
          },
        },
        // Roadmap
        {
          type: "link",
          label: "Roadmap",
          href: "/roadmap",
          customProps: {
            description: "Learn about upcoming/proposed changes to Harness products.",
          },
        },
        {
          type: "category",
          label: "FAQs",
          link: {
            type: "generated-index",
            slug: "/faqs",
          },
          customProps: {
            description: "Find answers to frequently asked questions.",
          },
          collapsed: true,
          items: [
            {
              type: "autogenerated",
              dirName: "faqs",
            },
          ],
        },
        {
          type: "category",
          label: "Troubleshooting",
          link: {
            type: "generated-index",
            slug: "/troubleshooting",
          },
          customProps: {
            description:
              "Find details about common error messages, what causes them, and solutions.",
          },
          collapsed: true,
          items: [
            {
              type: "autogenerated",
              dirName: "troubleshooting",
            },
          ],
        },
        {
          type: "category",
          label: "Harness Cloud Operations",
          link: {
            type: "generated-index",
            slug: "/harness-cloud-operations",
          },
          customProps: {
            description: "Information on how the Harness SaaS is managed",
          },
          collapsed: true,
          items: [
            {
              type: "autogenerated",
              dirName: "harness-cloud-operations",
            },
          ],
        },
      ],
    },
    // Cert Link from Docs
    {
      type: "link",
      label: "Certifications",
      href: "/certifications",
    },
    // KB Link from Docs
    {
      type: "link",
      label: "Knowledge Base",
      href: "/kb",
    },
    // Community Link from Docs
    {
      type: "link",
      label: "Community",
      href: "/community",
    },
  ],

};

module.exports = sidebars;
