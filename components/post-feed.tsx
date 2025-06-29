import { Button } from "@/components/ui/button"
import { PostCard } from "@/components/post-card"
import { Flame, Clock, TrendingUp, Sparkles } from "lucide-react"

export function PostFeed() {
  const posts = [
    {
      id: 1,
      title: "The Future of AI: What's Coming Next? 🚀",
      content:
        "Just attended an incredible AI conference and my mind is blown! The developments in neural networks and machine learning are happening faster than we can keep up. What do you think will be the next breakthrough?",
      author: "alex_dev",
      community: "tech-discussion",
      timestamp: "2 hours ago",
      upvotes: 1420,
      downvotes: 28,
      comments: 267,
      images: [
        "/placeholder.svg?height=400&width=700&text=AI+Conference+Main+Stage",
        "/placeholder.svg?height=400&width=700&text=Neural+Network+Diagram",
        "/placeholder.svg?height=400&width=700&text=AI+Demo+Setup",
        "/placeholder.svg?height=400&width=700&text=Conference+Crowd",
      ],
      tags: ["ai", "future-tech", "discussion", "breakthrough"],
      type: "trending",
      engagement: 95,
    },
    {
      id: 2,
      title: "My coding journey: From zero to full-stack in 6 months! ✨",
      content:
        "Six months ago, I couldn't even spell HTML. Today, I just deployed my first full-stack application to production! This community has been absolutely incredible. Here's my story and what I learned...",
      author: "sarah_codes",
      community: "general",
      timestamp: "4 hours ago",
      upvotes: 892,
      downvotes: 12,
      comments: 156,
      image: "/placeholder.svg?height=300&width=600&text=My+First+App+Screenshot",
      tags: ["journey", "inspiration", "fullstack", "beginner"],
      type: "inspiring",
      engagement: 88,
    },
    {
      id: 3,
      title: "Revolutionary Design System I Built for My Startup 🎨",
      content:
        "Spent the last 3 months building a comprehensive design system from scratch. It's completely changed how our team works. Sharing the process, tools, and lessons learned. AMA!",
      author: "design_wizard",
      community: "design-showcase",
      timestamp: "6 hours ago",
      upvotes: 2340,
      downvotes: 45,
      comments: 189,
      images: [
        "/placeholder.svg?height=400&width=700&text=Design+System+Overview",
        "/placeholder.svg?height=400&width=700&text=Component+Library",
        "/placeholder.svg?height=400&width=700&text=Color+Palette",
        "/placeholder.svg?height=400&width=700&text=Typography+Scale",
        "/placeholder.svg?height=400&width=700&text=Icon+Set",
      ],
      tags: ["design-system", "startup", "process", "ama"],
      type: "hot",
      engagement: 92,
    },
    {
      id: 4,
      title: "Open Source Project That Could Change Everything 🌟",
      content:
        "I've been working on this open-source tool for the past year. It solves a problem that every developer faces daily, and I think it could be a game-changer. Looking for contributors and feedback!",
      author: "code_ninja",
      community: "tech-discussion",
      timestamp: "8 hours ago",
      upvotes: 567,
      downvotes: 23,
      comments: 89,
      image: "/placeholder.svg?height=300&width=600&text=Open+Source+Tool+Demo",
      video: true,
      tags: ["opensource", "collaboration", "gameChanger", "feedback"],
      type: "new",
      engagement: 78,
    },
    {
      id: 5,
      title: "Behind the Scenes: Building a Viral Mobile App 📱",
      content:
        "Our app just hit 1 million downloads! Here's the complete behind-the-scenes story of how we built, launched, and scaled our mobile app. From idea to viral success in 8 months.",
      author: "tech_guru",
      community: "general",
      timestamp: "12 hours ago",
      upvotes: 3456,
      downvotes: 67,
      comments: 445,
      images: [
        "/placeholder.svg?height=400&width=700&text=App+Store+Screenshots",
        "/placeholder.svg?height=400&width=700&text=User+Analytics+Dashboard",
        "/placeholder.svg?height=400&width=700&text=Team+Celebration+Photo",
        "/placeholder.svg?height=400&width=700&text=App+UI+Mockups",
      ],
      tags: ["mobile", "startup", "viral", "success-story"],
      type: "hot",
      engagement: 97,
    },
    {
      id: 6,
      title: "Incredible 3D Art Created with Code 🎨✨",
      content:
        "Spent the weekend experimenting with generative art and created these stunning 3D visualizations using nothing but code. The intersection of art and technology never ceases to amaze me!",
      author: "design_wizard",
      community: "design-showcase",
      timestamp: "1 day ago",
      upvotes: 1234,
      downvotes: 15,
      comments: 178,
      images: [
        "/placeholder.svg?height=400&width=700&text=3D+Geometric+Art+1",
        "/placeholder.svg?height=400&width=700&text=3D+Geometric+Art+2",
        "/placeholder.svg?height=400&width=700&text=3D+Geometric+Art+3",
      ],
      tags: ["generative-art", "3d", "creative-coding", "visualization"],
      type: "inspiring",
      engagement: 91,
    },
  ]

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      {/* Hero Section with Background Image */}
      <div className="relative rounded-3xl overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-pink-600/90" />
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=800&text=Community+Hero+Background')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 p-8 text-white text-center">
          <h1 className="text-4xl font-bold mb-2">Discover Amazing Content</h1>
          <p className="text-white/90 text-lg">Curated posts from your favorite communities</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Latest Posts
          </h2>
          <p className="text-muted-foreground mt-1">Fresh content from the community</p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 rounded-xl border-orange-200 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300 transition-all bg-transparent"
          >
            <Flame className="w-4 h-4" />
            Hot
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all"
          >
            <Clock className="w-4 h-4" />
            New
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 rounded-xl hover:bg-purple-50 hover:text-purple-600 transition-all"
          >
            <TrendingUp className="w-4 h-4" />
            Trending
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 rounded-xl hover:bg-pink-50 hover:text-pink-600 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Best
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className="animate-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  )
}
