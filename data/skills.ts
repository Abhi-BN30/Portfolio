export const skillGroups = [
  {
    id: "code",
    index: "01",
    title: "Programming",
    description: "Core languages",
    skills: ["Python", "C", "Java"],
  },
  {
    id: "web",
    index: "02",
    title: "Web",
    description: "Application development",
    skills: ["Flask", "Angular", "MERN", "HTML", "CSS", "JavaScript"],
  },
  {
    id: "data",
    index: "03",
    title: "Data & ML",
    description: "Analysis and modelling",
    skills: ["Scikit", "NumPy", "Pandas", "Seaborn", "Statsmodels"],
  },
  {
    id: "storage",
    index: "04",
    title: "Databases",
    description: "Structured and document data",
    skills: ["MySQL", "PostgreSQL", "CosmosDB", "MongoDB"],
  },
  {
    id: "delivery",
    index: "05",
    title: "DevOps",
    description: "Build and delivery systems",
    skills: ["Docker", "Kubernetes", "Jenkins", "Azure Pipelines"],
  },
] as const;
