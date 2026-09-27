export interface EducationItem {
  year: string;
  institution: string;
  degree: string;
  cgpa: string;
  location: string;
}

export interface InternshipData {
  role: string;
  company: string;
  duration: string;
  points: string[];
  technologies: string[];
  pipelineSteps: string[];
  focusAreas: string[];
}

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  concepts: string[];
  metrics?: string[];
  imagePath: string;
  workflow: string[];
}

export interface SkillNode {
  id: string;
  label: string;
  category: 'PROGRAMMING' | 'WEB' | 'FRAMEWORK' | 'TOOLS';
  categoryColor: string;
  description: string;
  connections: string[];
  tier: number; // for radial / neural layering
}

export interface CertificationData {
  title: string;
  issuer: string;
  tag: string;
}

export const PERSONAL_INFO = {
  name: "Meesala Satya Sirisha",
  firstName: "SATYA",
  lastName: "SIRISHA",
  title: "B.Tech Information Technology",
  batch: "2023 — 2027",
  email: "satyasirishameesala@gmail.com",
  linkedin: "https://www.linkedin.com/in/sirisha-m-556225291/",
  github: "https://github.com/SirishaMeesala/",
  careerObjective: "Highly motivated and adaptable final-year B.Tech Information Technology student seeking an entry-level engineering role. A fast learner and quick grasper who excels at absorbing new concepts, adapting swiftly to changing environments, and readily mastering new technologies to deliver effective technical solutions.",
};

export const TIMELINE_DATA: EducationItem[] = [
  {
    year: "2021",
    institution: "Ashram Public School (CBSE)",
    degree: "Secondary Education",
    cgpa: "8.0",
    location: "Andhra Pradesh",
  },
  {
    year: "2021 – 2023",
    institution: "Sri Sai Aditya Junior College",
    degree: "Intermediate (MPC)",
    cgpa: "7.4",
    location: "Andhra Pradesh",
  },
  {
    year: "2023 – 2027",
    institution: "Aditya College of Engineering and Technology",
    degree: "B.Tech - Information Technology",
    cgpa: "7.9",
    location: "Andhra Pradesh",
  },
];

export const INTERNSHIP_DATA: InternshipData = {
  role: "Artificial Intelligence Intern",
  company: "Personifwy (1Stop)",
  duration: "May 2025 – June 2025",
  points: [
    "Developed ML-based text classification and object detection solutions using Python, TensorFlow, and Keras.",
    "Implemented end-to-end data preprocessing, pipeline engineering, model training, and performance validation.",
  ],
  technologies: ["Python", "TensorFlow", "Keras"],
  pipelineSteps: [
    "Python",
    "TensorFlow",
    "Keras",
    "Data Preprocessing",
    "Model Training",
    "Performance Validation",
  ],
  focusAreas: ["TEXT CLASSIFICATION", "OBJECT DETECTION"],
};

export const PROJECTS_DATA: ProjectData[] = [
  {
    id: "smartshelf-ai",
    title: "SmartShelf AI",
    subtitle: "Intelligent Inventory Management & Demand Forecasting System",
    description:
      "Developed an AI-based inventory management system using machine learning for demand forecasting, stock monitoring, and inventory optimization. Built a Flask-based dashboard with analytics and low-stock alerts to provide real-time inventory insights.",
    features: [
      "Machine Learning demand forecasting",
      "Real-time stock monitoring & inventory optimization",
      "Flask-based interactive analytics dashboard",
      "Automated low-stock threshold warning system",
    ],
    concepts: [
      "Machine Learning",
      "Demand Forecasting",
      "Stock Monitoring",
      "Inventory Optimization",
      "Flask Dashboard",
      "Analytics",
      "Low-stock Alerts",
    ],
    imagePath: "/src/assets/images/smartshelf_preview_1790497981005.jpg",
    workflow: [
      "Inventory Telemetry Ingestion",
      "Time-Series Feature Extraction",
      "ML Demand Prediction",
      "Stock Level Threshold Analysis",
      "Flask Analytics & Low-Stock Alerts",
    ],
  },
  {
    id: "reviewguard",
    title: "ReviewGuard",
    subtitle: "AI-Powered Fake Product Review Detection System",
    description:
      "Developed a machine learning-based system to classify e-commerce reviews as genuine or fake using TF-IDF feature extraction and classification algorithms. Implemented data preprocessing, model training, and evaluation using accuracy, precision, recall, and F1-score metrics.",
    features: [
      "Text preprocessing and linguistic tokenization",
      "TF-IDF n-gram feature matrix extraction",
      "Binary classification: Genuine vs Fake review detection",
      "Evaluation against standard ML performance metrics",
    ],
    concepts: [
      "Product Review",
      "Text Processing",
      "TF-IDF",
      "Classification",
      "Genuine / Fake",
    ],
    metrics: ["Accuracy", "Precision", "Recall", "F1-score"],
    imagePath: "/src/assets/images/reviewguard_preview_1790497994182.jpg",
    workflow: [
      "Product Review Input",
      "Text Preprocessing & Cleaning",
      "TF-IDF Vector Representation",
      "Classification Algorithm",
      "Genuine / Fake Verification",
    ],
  },
];

export const SKILL_NODES: SkillNode[] = [
  {
    id: "python",
    label: "Python",
    category: "PROGRAMMING",
    categoryColor: "#38bdf8",
    description: "Core language used for machine learning pipelines, data processing, algorithms, and backend services.",
    connections: ["sql", "java", "flask", "jupyter"],
    tier: 1,
  },
  {
    id: "java",
    label: "Java",
    category: "PROGRAMMING",
    categoryColor: "#38bdf8",
    description: "Object-oriented programming language for structured software development, robust algorithmic problem-solving, and system design.",
    connections: ["python", "sql", "vscode", "git"],
    tier: 2,
  },
  {
    id: "sql",
    label: "SQL",
    category: "PROGRAMMING",
    categoryColor: "#38bdf8",
    description: "Relational database querying language used for structured dataset queries, tabular schemas, and data management in application backends.",
    connections: ["python", "flask", "java"],
    tier: 2,
  },
  {
    id: "html",
    label: "HTML",
    category: "WEB",
    categoryColor: "#c084fc",
    description: "Semantic web markup foundational for rendering browser structures, forms, and dashboard interfaces in web systems.",
    connections: ["css", "javascript", "flask"],
    tier: 2,
  },
  {
    id: "css",
    label: "CSS",
    category: "WEB",
    categoryColor: "#c084fc",
    description: "Styling and visual presentation for modern responsive user interfaces, dashboard layouts, and interactive visual designs.",
    connections: ["html", "javascript"],
    tier: 2,
  },
  {
    id: "javascript",
    label: "JavaScript",
    category: "WEB",
    categoryColor: "#c084fc",
    description: "Client-side scripting language driving dynamic browser interactivity, asynchronous API telemetry, and UI state handling.",
    connections: ["html", "css", "flask"],
    tier: 2,
  },
  {
    id: "flask",
    label: "Flask",
    category: "FRAMEWORK",
    categoryColor: "#a855f7",
    description: "Lightweight Python web framework utilized for serving machine learning models, REST endpoints, and analytics dashboards.",
    connections: ["python", "html", "javascript", "sql"],
    tier: 1,
  },
  {
    id: "git",
    label: "Git",
    category: "TOOLS",
    categoryColor: "#818cf8",
    description: "Distributed version control system for tracking source code revisions, collaborative branching, and repository history.",
    connections: ["github", "vscode"],
    tier: 2,
  },
  {
    id: "github",
    label: "GitHub",
    category: "TOOLS",
    categoryColor: "#818cf8",
    description: "Cloud-hosted platform for code hosting, repository management, continuous workflows, and version control collaboration.",
    connections: ["git", "vscode"],
    tier: 2,
  },
  {
    id: "vscode",
    label: "VS Code",
    category: "TOOLS",
    categoryColor: "#818cf8",
    description: "Extensible code editor and engineering IDE used for full-stack programming, debugging, and terminal workflows.",
    connections: ["git", "github", "python", "jupyter"],
    tier: 3,
  },
  {
    id: "jupyter",
    label: "Jupyter Notebook",
    category: "TOOLS",
    categoryColor: "#818cf8",
    description: "Interactive computing environment used for rapid ML experimentation, data preprocessing inspection, and model training workflows.",
    connections: ["python", "vscode"],
    tier: 2,
  },
];

export const CERTIFICATIONS_DATA: CertificationData[] = [
  {
    title: "Artificial Intelligence Internship Certification",
    issuer: "Personifwy (1Stop)",
    tag: "AI & Machine Learning",
  },
  {
    title: "Python Essentials 1 Certification",
    issuer: "Cisco Networking Academy",
    tag: "Core Programming",
  },
];
