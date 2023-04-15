import Header from "@/components/Header"

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 lg:pt-44">{children}</main>
    </div>
  )
}
