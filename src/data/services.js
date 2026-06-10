// `startingPrice` is shown as the indicative starting rate. Set it to `null`
// for services priced per project — the card then shows "Contact for a quote".
export const services = [
  {
    id: 1,
    icon: 'mdi-web',
    title: 'Static Website Creation',
    description:
      'Fast, responsive websites built to make your business or project look professional online — from a single landing page to a full multi-page site.',
    startingPrice: 'from $300',
    features: [
      'Responsive, mobile-friendly design',
      'Contact / quote request form',
      'SEO basics & fast load times',
      'Deployment & hosting setup',
    ],
    chips: ['Vue', 'JavaScript'],
  },
  {
    id: 2,
    icon: 'mdi-wrench',
    title: 'Website Maintenance',
    description:
      'Keep your existing site current and healthy. Ongoing updates, fixes, and small improvements so you never have to worry about it going stale.',
    startingPrice: 'from $30/mo',
    features: [
      'Content edits & updates',
      'Dependency & security upkeep',
      'Bug fixes',
      'Small feature additions',
    ],
    chips: ['Vue', 'JavaScript'],
  },
  
  {
    id: 3,
    icon: 'mdi-cog-sync',
    title: 'Automation Scripting & Improvements',
    description:
      'Custom scripts that take repetitive, manual work off your plate — from data entry and reporting to file processing and integrations.',
    startingPrice: null, // priced per project — shows "Want a Quote?"
    features: [
      'Automate repetitive tasks',
      'Data extraction & web scraping',
      'Spreadsheet & report automation',
      'Workflow & integration scripting',
    ],
    chips: ['Python', 'Bash', 'APIs'],
  },
]
