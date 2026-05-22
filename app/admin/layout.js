import AdminSidebar from "@/components/admin/AdminSidebar"

export const metadata = {
  title: { default: "Admin | Scraply Auto", template: "%s | Admin" },
}

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto pt-14 lg:pt-0">
        {children}
      </main>
    </div>
  )
}
