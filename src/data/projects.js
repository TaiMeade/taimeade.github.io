export const projects = [
  {
    id: 1,
    title: 'The Vault',
    description:
      'A local password-saving application that prioritizes user privacy. Unlike cloud-based apps, it stores all passwords directly on the device — eliminating server breach risk and placing security responsibility with the user.',
    image: '/images/theVaultLogo.png',
    chips: ['Electron', 'HTML', 'CSS', 'JavaScript'],
    category: 'personal',
    githubUrl: 'https://github.com/TaiMeade/passwordManager',
  },
  {
    id: 2,
    title: 'Impastas — iCook',
    description:
      'A group project from Software Engineering class (team of 5). A social-media-style application for cooking enthusiasts to share recipes and discover new ones.',
    image: '/images/Impastas_Logo.png',
    chips: ['TypeScript', 'Tailwind', 'Prisma', 'React'],
    category: 'school',
    githubUrl: 'https://github.com/TaiMeade/SoftwareEngineering1TeamProject',
  },
  {
    id: 3,
    title: 'Prime or Composite',
    description:
      'A highly optimized CLI tool to determine if a number is prime or composite. Uses the Babylonian method for fast square root calculations and supports numbers up to 10¹⁸.',
    image: '/images/Prime-and-Composite-Numbers.png',
    chips: ['Rust'],
    category: 'school',
    githubUrl: 'https://github.com/TaiMeade/primeOrComposite',
  },
  {
    id: 4,
    title: 'Nametag Creator',
    description:
      'A simple GUI application that generates formatted nametag PDFs from a CSV file. Built for the NYSC in 2025 to create nametags for all delegates, guests, and staff (staph).',
    image: '/images/nametag.jpg',
    chips: ['Python', 'Streamlit'],
    category: 'personal',
    githubUrl: 'https://github.com/TaiMeade/nyscNameTagCreatorGUI',
  },
  {
    id: 5,
    title: 'Mountain Empire Septic Service',
    description:
      'A professional business website for a locally owned septic service company in Southwest Virginia. Features service listings, reviews, and a contact/quote request form.',
    image: '/images/mountain-empire-septic-service.png',
    chips: ['Vue', 'Vuetify', 'JavaScript'],
    category: 'website',
    githubUrl: null,
    liveUrl: 'https://www.mountainempiresepticservice.com/',
  },
  {
    id: 6,
    title: "Legacy Pool Co.",
    description:
      'A professional business website for a locally owned pool maintenance company in Yuma, Arizona. Features service listings, reviews, and a contact/quote request form.',
    image: '/images/legacy-pool-co.png',
    chips: ['Vue', 'Vuetify', 'JavaScript'],
    category: 'website',
    githubUrl: null,
    liveUrl: 'https://www.legacypoolco.com/',
  },
]

export const categories = [
  { label: 'All',      value: 'all' },
  { label: 'Personal', value: 'personal' },
  { label: 'School',   value: 'school' },
  { label: 'Websites', value: 'website' },
]
