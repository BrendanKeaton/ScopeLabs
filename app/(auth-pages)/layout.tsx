export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-et-teal via-et-teal to-teal-600">
      {children}
    </div>
  );
}
