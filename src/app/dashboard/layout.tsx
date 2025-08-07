'use client'

import { usePathname } from 'next/navigation'
import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <Sidebar currentPath={pathname} />
      <div className="flex flex-col w-0 flex-1 overflow-hidden md:ml-64">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
