export const sections = [
  { id: "home", label: "Home", marker: "01" },
  { id: "about", label: "About", marker: "02" },
  { id: "experience", label: "Experience", marker: "03" },
  { id: "projects", label: "Projects", marker: "04" },
  { id: "skills", label: "Skills", marker: "05" },
  { id: "education", label: "Education", marker: "06" },
  { id: "contact", label: "Contact", marker: "07" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

export const navigation = sections;
