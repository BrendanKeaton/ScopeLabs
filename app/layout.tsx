import { Atkinson_Hyperlegible } from "next/font/google";
import { Outfit } from "next/font/google";
import "./globals.css";

const Atkinson = Atkinson_Hyperlegible({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"], // Include desired weights
  display: "swap",
});

export { Atkinson };

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "EdTech Video Platform",
  description: "Technical take home test for Scope Labs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={Atkinson.className} suppressHydrationWarning>
      <body className="mx-auto text-foreground">{children}</body>
    </html>
  );
}
