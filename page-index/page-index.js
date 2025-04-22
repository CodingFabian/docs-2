const apiReferencePageIndex = require("../api/page-index/page-index");
const selfHostedPageIndex = require("../self-hosted/page-index/page-index");
const timescaleMSTPageIndex = require("../mst/page-index/page-index");
const gsgPageIndex = require("../getting-started/page-index/page-index");
const timescaleUsingPageIndex = require("../use-timescale/page-index/page-index");
const navigationPageIndex = require("../navigation/page-index/page-index");
const tutorialsPageIndex = require("../implement-use-cases/page-index/page-index.js");
const DeployUpgrade = require("../deploy-and-upgrade/page-index/page-index.js");
const codeQuickStartsPageIndex = require("../quick-start/page-index/page-index.js");
const migrationPageIndex = require("../ingest-and-migrate/page-index/page-index.js");
const timescaleAboutPageIndex = require("../about/page-index/page-index");
const AIPageIndex = require("../build-for-ai/page-index/page-index");
const AdminTimscaleCloud = require("../administer-your-deployment/page-index/page-index");
const AdminMST = require("../administer-mst/page-index/page-index");
const AdminSelfHosted = require("../administer-self-hosted/page-index/page-index");
const Troubleshooting = require("../troubleshooting/page-index/page-index");
const AccessAndControl = require("../access-and-control/page-index/page-index");
const DataSecurity = require("../operate-and-scale/page-index/page-index");
const DataIngestMigrate = require("../ingest-and-migrate/page-index/page-index");
const EfficientStorage = require("../efficient-storage/page-index/page-index");
const Databasics = require("../databasics/page-index/page-index");
const QueryPerformance = require("../query-performance/page-index/page-index");
const Reference = require("../reference/page-index/page-index");
const APIReference = require("../api-reference/page-index/page-index");
const Integrations = require("../integrations/page-index/page-index");
const Security = require("../security/page-index/page-index");

module.exports = [
  ...gsgPageIndex,
  ...timescaleAboutPageIndex,
  ...DeployUpgrade,
  ...Databasics,
  ...tutorialsPageIndex,
  ...navigationPageIndex,
  ...Integrations,
  ...Troubleshooting,
  ...AIPageIndex,
  ...DataSecurity,
  ...DataIngestMigrate,
  ...EfficientStorage,
  ...QueryPerformance,
  ...Security,
  ...Reference,
  ...APIReference,
  {
    Title: "GitHub",
    type: "external",
    href: "https://github.com",
  },
];
