import NavbarProtected from "@/components/protected/navbar-protected";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4">
      <NavbarProtected />
      {children}
    </div>
  );
}
