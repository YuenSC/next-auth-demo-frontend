import ProtectedSideBar from "./components/ProtectedSideBar";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <ProtectedSideBar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
