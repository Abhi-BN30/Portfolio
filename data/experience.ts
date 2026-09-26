export type ExperienceItem = {
  id: string;
  year: string;
  organization: string;
  role: string;
  summary: string;
  details: string[];
  metrics: string[];
  tags: string[];
};

export const experience: ExperienceItem[] = [
  {
    id: "dover",
    year: "2026 — PRESENT",
    organization: "Dover India Pvt. Ltd.",
    role: "Software Engineering",
    summary:
      "Building CxPortal, a large-scale Angular–C# e-commerce platform serving companies across a network of customer portals.",
    details: [
      "Working across a shared codebase serving 50+ companies through 36+ portals.",
      "Platform workflows span Azure AD B2C authentication, Intershop, product purchases, payments, orders, shipments, returns, and user management.",
    ],
    metrics: ["50+ companies", "36+ portals"],
    tags: ["Angular", "C#", "Azure AD B2C", "Intershop"],
  },
  {
    id: "dentsu",
    year: "SUMMER 2025",
    organization: "Dentsu Global Services",
    role: "Software Engineering Intern",
    summary:
      "Developed a chatbot module for the Cognitive Computing Platform, translating natural-language questions into SQL for real-time business queries.",
    details: [
      "Integrated the module into 10+ internal projects.",
      "Connected conversational input with data queries to help business users reach decision-ready information.",
    ],
    metrics: ["10+ internal projects"],
    tags: ["Natural language", "Chatbot", "SQL", "Data"],
  },
  {
    id: "cisfcr",
    year: "2024",
    organization: "PESU C-ISFCR",
    role: "Software Engineering",
    summary:
      "Built RISC, a secure assessment portal used by more than 600 students, with containerized automated evaluation.",
    details: [
      "Automated evaluation using Docker containers.",
      "Reduced manual review effort by 40%.",
    ],
    metrics: ["600+ students", "40% less manual review"],
    tags: ["Docker", "Assessment portal", "Automation"],
  },
];
