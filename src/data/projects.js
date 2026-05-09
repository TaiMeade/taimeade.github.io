export const projects = [
  {
    id: 1,
    title: 'The Vault',
    description:
      'A local password-saving application that prioritizes user privacy. Unlike cloud-based apps, it stores all passwords directly on the device — eliminating server breach risk and placing security responsibility with the user.',
    image: './../../images/theVaultLogo.png',
    chips: ['Electron', 'HTML', 'CSS', 'JavaScript'],
    category: 'personal',
    githubUrl: 'https://github.com/TaiMeade/passwordManager',
  },
  {
    id: 2,
    title: 'Impastas — iCook',
    description:
      'A group project from Software Engineering class (team of 5). A social-media-style application for cooking enthusiasts to share recipes and discover new ones.',
    image: './../../images/Impastas_Logo.png',
    chips: ['TypeScript', 'Tailwind', 'Prisma', 'React'],
    category: 'school',
    githubUrl: 'https://github.com/TaiMeade/SoftwareEngineering1TeamProject',
  },
  {
    id: 3,
    title: 'Prime or Composite',
    description:
      'A highly optimized CLI tool to determine if a number is prime or composite. Uses the Babylonian method for fast square root calculations and supports numbers up to 10¹⁸.',
    image: './../../images/Prime-and-Composite-Numbers.png',
    chips: ['Rust'],
    category: 'school',
    githubUrl: 'https://github.com/TaiMeade/primeOrComposite',
  },
  {
    id: 4,
    title: 'Nametag Creator',
    description:
      'A GUI application that generates formatted nametag PDFs from a CSV file. Built for the NYSC in 2025 to create nametags for all conference delegates.',
    image: './../../images/nametag.jpg',
    chips: ['Python', 'Streamlit'],
    category: 'personal',
    githubUrl: 'https://github.com/TaiMeade/nyscNameTagCreatorGUI',
  },
  {
    id: 5,
    title: 'Mountain Empire Septic Service',
    description:
      'A professional business website for a locally owned septic service company in Southwest Virginia. Features service listings, a coverage map, Google reviews integration, and a contact/quote request form.',
    image: './../../images/mountain-empire-septic-service.png',
    chips: ['HTML', 'CSS', 'JavaScript'],
    category: 'website',
    githubUrl: null,
    liveUrl: 'https://www.mountainempiresepticservice.com/',
  },
]

export const categories = [
  { label: 'All',      value: 'all' },
  { label: 'Personal', value: 'personal' },
  { label: 'School',   value: 'school' },
  { label: 'Websites', value: 'website' },
]
