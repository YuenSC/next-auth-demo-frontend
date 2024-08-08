import PublicNavBar from "./components/navbar/PublicNavBar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PublicNavBar />
      {children}
    </>
  );
}
