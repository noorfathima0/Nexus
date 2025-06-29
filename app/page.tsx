import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { PostFeed } from "@/components/post-feed"
import { TrendingPanel } from "@/components/trending-panel"
import { FloatingActions } from "@/components/floating-actions"

export default function CommunityPlatform() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 perspective-[2000px]">
      <div className="flex h-screen transform-style-3d">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1 flex overflow-hidden">
            <main className="flex-1 overflow-y-auto perspective-[1500px]">
              <PostFeed />
            </main>
            <aside className="w-80 overflow-y-auto hidden lg:block perspective-[1000px]">
              <TrendingPanel />
            </aside>
          </div>
        </div>
        <FloatingActions />
      </div>
    </div>
  )
}
