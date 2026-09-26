import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abhilash B N V S — Software Engineer",
  description:
    "Abhilash B N V S is a software engineer focused on full-stack development, scalable data systems, and applied AI.",
  openGraph: {
    title: "Abhilash B N V S — Software Engineer",
    description:
      "Building scalable software, intelligent data systems, and applied AI experiences.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhilash B N V S — Software Engineer",
    description:
      "Building scalable software, intelligent data systems, and applied AI experiences.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
