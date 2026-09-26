export type Project = {
  number: string;
  title: string;
  year: string;
  category: string;
  summary: string;
  details: string[];
  technologies: string[];
  metrics: string[];
  motif: "enterprise" | "network" | "query" | "signal" | "routing";
};

export const projects: Project[] = [
  {
    number: "01",
    title: "CDS EComm CxPortal",
    year: "2026",
    category: "ENTERPRISE COMMERCE",
    summary:
      "A shared Angular–C# e-commerce platform hosted on Azure, connecting customer portals to a common commerce system.",
    details: [
      "Supports 36+ customer URLs and 50+ companies through a shared codebase.",
      "Workflows include Azure AD B2C, Intershop, product browsing and purchasing, shipment tracking, returns, requests, user management, order processing, payments, and transaction management.",
    ],
    technologies: ["Angular", "C#", "Azure", "Azure AD B2C", "Intershop"],
    metrics: ["50+ companies", "36+ portals"],
    motif: "enterprise",
  },
  {
    number: "02",
    title: "Resource Management Tool",
    year: "2026",
    category: "ORGANIZATIONAL INTELLIGENCE",
    summary:
      "A resource planning application for connecting people, projects, allocation, and organizational data.",
    details: [
      "Models employees, projects, cost matrices, billing rates, organizational hierarchies, resource allocation, assignments, and bandwidth utilization with dashboards.",
      "Includes a contextual chatbot for application-wide data queries, structured tabular insights, organization-level validation, and access controls.",
    ],
    technologies: ["Angular", "Node.js", "PostgreSQL"],
    metrics: [],
    motif: "network",
  },
  {
    number: "03",
    title: "AI-Powered Chatbot for Data Insights",
    year: "2025",
    category: "CONVERSATIONAL DATA",
    summary:
      "A natural-language interface that translates questions into SQL and returns contextual data insights.",
    details: [
      "Uses Claude-Sonnet through Snowflake Cortex to process more than one million records.",
      "Supports contextual conversations and personalized recommendations with reported response times under five seconds.",
    ],
    technologies: ["Snowflake Cortex", "Claude-Sonnet", "SQL"],
    metrics: ["1M+ records", "<5s response time"],
    motif: "query",
  },
  {
    number: "04",
    title: "Classification of Abnormalities in EEG Recordings",
    year: "2026 · IN DEVELOPMENT",
    category: "MACHINE LEARNING · SIGNALS",
    summary:
      "An EEGNet-based model to classify normal and abnormal patients from neuro findings for the Indian Air Force Command Hospital.",
    details: [
      "Works with 3,000+ EEG scans captured across 19 electrodes.",
      "Preliminary test accuracy: 78%.",
    ],
    technologies: ["EEGNet", "Machine learning"],
    metrics: ["3,000+ EEG scans", "19 electrodes", "78% preliminary accuracy"],
    motif: "signal",
  },
  {
    number: "05",
    title: "Real-Time Driver Allocation",
    year: "2025",
    category: "URBAN DATA SYSTEMS",
    summary:
      "A driver-routing API built for The Great Bengaluru Hackathon, balancing allocation across city demand zones.",
    details: [
      "Routes drivers across 50 urban population zones using historical and live patterns.",
      "Explored Apache Spark, Kafka, and dynamic heatmaps; reported a 30% allocation improvement.",
    ],
    technologies: ["Apache Spark", "Kafka", "Dynamic heatmaps"],
    metrics: ["50 urban zones", "30% allocation improvement"],
    motif: "routing",
  },
];
