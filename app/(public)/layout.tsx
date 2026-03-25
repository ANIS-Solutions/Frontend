import Footer from "../components/layout/Footer"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Navbar /> */}
      <main className="min-h-screen bg-white">
        {children}
      </main>
      <Footer />
    </>
  );
}