export interface GitHubRepo {
  name: string;
  description: string;
  url: string;
  language: string | null;
  stars: number;
}

export const githubRepos: GitHubRepo[] = [
  {
    name: "Blog-Writer",
    description: "Blog writing tool",
    url: "https://github.com/stark3998/Blog-Writer",
    language: "Python",
    stars: 0,
  },
  {
    name: "portfolio",
    description: "Personal portfolio website",
    url: "https://github.com/stark3998/portfolio",
    language: "TypeScript",
    stars: 0,
  },
  {
    name: "Entra-Security-Analytics",
    description: "Entra Security Analytics",
    url: "https://github.com/stark3998/Entra-Security-Analytics",
    language: "Python",
    stars: 0,
  },
  {
    name: "Secure-Azure-Bicep-Templates",
    description: "Secure Azure Bicep Templates",
    url: "https://github.com/stark3998/Secure-Azure-Bicep-Templates",
    language: null,
    stars: 0,
  },
  {
    name: "App-Migration-UI",
    description: "Application migration user interface",
    url: "https://github.com/stark3998/App-Migration-UI",
    language: null,
    stars: 0,
  },
  {
    name: "SwiftNet",
    description: "SwiftNet: Adaptive IoT Communication System",
    url: "https://github.com/stark3998/SwiftNet",
    language: "C++",
    stars: 0,
  },
  {
    name: "keystone",
    description: "ERA: Emergency Response Assistance",
    url: "https://github.com/stark3998/keystone",
    language: "Jupyter Notebook",
    stars: 0,
  },
  {
    name: "VisionOS",
    description: "Vision OS Projects to expand LMS into VR",
    url: "https://github.com/stark3998/VisionOS",
    language: "Swift",
    stars: 0,
  },
  {
    name: "OS",
    description: "A repository of Operating System Concepts in C",
    url: "https://github.com/stark3998/OS",
    language: "C",
    stars: 0,
  },
  {
    name: "enhancedRC4",
    description:
      "Enhanced RC4 Encryption algorithm addressing weaknesses in the TLS/SSL Protocol with a more secure pseudo random bit generator",
    url: "https://github.com/stark3998/enhancedRC4",
    language: "Python",
    stars: 0,
  },
  {
    name: "Docx2txt",
    description: "Convert .Docx files to .TXT files using Python",
    url: "https://github.com/stark3998/Docx2txt",
    language: "Shell",
    stars: 0,
  },
  {
    name: "sarah",
    description: "Web project",
    url: "https://github.com/stark3998/sarah",
    language: "CSS",
    stars: 0,
  },
  {
    name: "Hospital-Management",
    description: "Django based Hospital Management Project",
    url: "https://github.com/stark3998/Hospital-Management",
    language: "CSS",
    stars: 1,
  },
  {
    name: "Whatsapp-Scraper",
    description:
      "Scrape chats and user details from WhatsApp with a comprehensive view of users and messages",
    url: "https://github.com/stark3998/Whatsapp-Scraper",
    language: "HTML",
    stars: 0,
  },
  {
    name: "Twitter-Sentiment-Analysis",
    description: "Twitter Sentiment Analysis Code",
    url: "https://github.com/stark3998/Twitter-Sentiment-Analysis",
    language: "Python",
    stars: 1,
  },
  {
    name: "Data-Visualization",
    description: "Data Visualization and Analysis using Python",
    url: "https://github.com/stark3998/Data-Visualization",
    language: "Jupyter Notebook",
    stars: 0,
  },
  {
    name: "kaggle",
    description: "Kaggle Competition",
    url: "https://github.com/stark3998/kaggle",
    language: "Python",
    stars: 0,
  },
  {
    name: "Instagram",
    description:
      "Scrape User Profiles on Instagram and download all posts from a profile",
    url: "https://github.com/stark3998/Instagram",
    language: "Python",
    stars: 0,
  },
  {
    name: "Instagram-Scraper",
    description: "Download all posts, captions and comments from a user's profile",
    url: "https://github.com/stark3998/Instagram-Scraper",
    language: "Python",
    stars: 1,
  },
  {
    name: "Election",
    description: "Scraping: Election Polling Station Data",
    url: "https://github.com/stark3998/Election",
    language: "Python",
    stars: 1,
  },
  {
    name: "Face-Detection",
    description: "Face Detection using OpenCV",
    url: "https://github.com/stark3998/Face-Detection",
    language: "Python",
    stars: 1,
  },
  {
    name: "Web-Dev-Projects",
    description: "Web Development Projects",
    url: "https://github.com/stark3998/Web-Dev-Projects",
    language: "HTML",
    stars: 1,
  },
  {
    name: "PFOC",
    description: "Personalized Factual Oriented Chatbot",
    url: "https://github.com/stark3998/PFOC",
    language: "Python",
    stars: 1,
  },
  {
    name: "AAP-Tasks",
    description: "Tasks assigned for Aam Aadmi Party Internship",
    url: "https://github.com/stark3998/AAP-Tasks",
    language: "Python",
    stars: 1,
  },
  {
    name: "Website-V3",
    description: "Personal website version 3",
    url: "https://github.com/stark3998/Website-V3",
    language: "CSS",
    stars: 0,
  },
  {
    name: "Routing",
    description: "HMEL Movie Booking App in SAPUi5",
    url: "https://github.com/stark3998/Routing",
    language: null,
    stars: 0,
  },
  {
    name: "HMEL_Movie",
    description: "Movie Booking app for HMEL Township in OpenUi5",
    url: "https://github.com/stark3998/HMEL_Movie",
    language: null,
    stars: 0,
  },
  {
    name: "Training",
    description: "Training materials",
    url: "https://github.com/stark3998/Training",
    language: null,
    stars: 0,
  },
  {
    name: "Website-V2",
    description: "Compiling HTML and CSS Codes with JavaScript",
    url: "https://github.com/stark3998/Website-V2",
    language: "CSS",
    stars: 0,
  },
  {
    name: "WebsiteAdv",
    description: "Advanced Website Template",
    url: "https://github.com/stark3998/WebsiteAdv",
    language: null,
    stars: 0,
  },
];

export const GITHUB_PROFILE_URL = "https://github.com/stark3998";

export const languageColors: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#3178C6",
  "C++": "#f34b7d",
  C: "#555555",
  Swift: "#F05138",
  Shell: "#89e051",
  CSS: "#563d7c",
  HTML: "#e34c26",
  "Jupyter Notebook": "#DA5B0B",
};
