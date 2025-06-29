"use client"

import type React from "react"

import { Home, TrendingUp, Users, Settings, Plus, Search, Sparkles, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import Image from "next/image"

export function Sidebar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState("home")
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateCommunity, setShowCreateCommunity] = useState(false)
  const [newCommunityName, setNewCommunityName] = useState("")
  const [joinedCommunities, setJoinedCommunities] = useState<string[]>([
    "general",
    "tech-discussion",
    "design-showcase",
  ])

  const communities = [
    {
      name: "general",
      members: "12.5k",
      color: "from-blue-500 to-cyan-500",
      icon: "💬",
      banner: "/placeholder.svg?height=60&width=200&text=General+Community",
      isJoined: joinedCommunities.includes("general"),
    },
    {
      name: "tech-discussion",
      members: "8.2k",
      color: "from-green-500 to-emerald-500",
      icon: "⚡",
      banner: "/placeholder.svg?height=60&width=200&text=Tech+Discussion",
      isJoined: joinedCommunities.includes("tech-discussion"),
    },
    {
      name: "design-showcase",
      members: "5.7k",
      color: "from-purple-500 to-pink-500",
      icon: "🎨",
      banner: "/placeholder.svg?height=60&width=200&text=Design+Showcase",
      isJoined: joinedCommunities.includes("design-showcase"),
    },
    {
      name: "random",
      members: "15.3k",
      color: "from-orange-500 to-red-500",
      icon: "🎲",
      banner: "/placeholder.svg?height=60&width=200&text=Random+Chat",
      isJoined: joinedCommunities.includes("random"),
    },
    {
      name: "help-support",
      members: "3.1k",
      color: "from-red-500 to-rose-500",
      icon: "🆘",
      banner: "/placeholder.svg?height=60&width=200&text=Help+Support",
      isJoined: joinedCommunities.includes("help-support"),
    },
  ]

  const handleNavigation = (section: string, label: string) => {
    setActiveSection(section)
    toast({
      title: `Navigating to ${label}`,
      description: "Loading content...",
    })
  }

  const handleCommunityClick = (communityName: string) => {
    toast({
      title: `Opening #${communityName}`,
      description: "Loading community posts and discussions...",
    })
  }

  const handleJoinCommunity = (communityName: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const isCurrentlyJoined = joinedCommunities.includes(communityName)

    if (isCurrentlyJoined) {
      setJoinedCommunities((prev) => prev.filter((name) => name !== communityName))
      toast({
        title: `Left #${communityName}`,
        description: "You've left this community.",
      })
    } else {
      setJoinedCommunities((prev) => [...prev, communityName])
      toast({
        title: `Joined #${communityName}! 🎉`,
        description: "Welcome to the community!",
      })
    }
  }

  const handleSearchCommunities = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      toast({
        title: `Searching communities for "${searchQuery}"`,
        description: "Finding relevant communities...",
      })
    }
  }

  const handleCreateCommunity = () => {
    if (newCommunityName.trim()) {
      toast({
        title: `Community "#${newCommunityName}" created! 🎉`,
        description: "Your new community is ready for members.",
      })
      setNewCommunityName("")
      setShowCreateCommunity(false)
    }
  }

  const handleProfileSettings = () => {
    toast({
      title: "Opening profile settings",
      description: "Loading your account preferences...",
    })
  }

  return (
    <div className="w-72 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-r border-white/20 flex flex-col relative overflow-hidden perspective-[1000px]">
      {/* Animated background with image overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5 animate-pulse" />
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=300&text=Sidebar+Background')] bg-cover bg-center opacity-5" />

      <div className="relative z-10 p-6 border-b border-white/10">
        <div
          className={`
            flex items-center gap-3 mb-6 transition-all duration-500 transform-style-3d cursor-pointer
            ${hoveredItem === "logo" ? "translate-z-[10px] scale-105" : "translate-z-0 scale-100"}
          `}
          onMouseEnter={() => setHoveredItem("logo")}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={() => {
            toast({
              title: "Welcome to Nexus! ✨",
              description: "Your community hub for amazing discussions.",
            })
          }}
        >
          <div
            className={`
              w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center 
              shadow-lg transition-all duration-500 transform-style-3d relative overflow-hidden
              ${hoveredItem === "logo" ? "rotate-[360deg] scale-110 translate-z-[5px]" : "rotate-0 scale-100 translate-z-0"}
            `}
          >
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=40&width=40&text=Logo')] bg-cover bg-center opacity-20" />
            <Sparkles className="w-5 h-5 text-white relative z-10" />
          </div>
          <div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Nexus
            </span>
            <div className="text-xs text-muted-foreground">Community Hub</div>
          </div>
        </div>

        <form onSubmit={handleSearchCommunities} className="relative group">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-blue-500 transition-colors" />
          <Input
            placeholder="Discover communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 bg-white/50 dark:bg-slate-800/50 border-white/20 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl backdrop-blur-sm"
          />
        </form>
      </div>

      <ScrollArea className="flex-1 relative z-10">
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            {[
              { icon: Home, label: "Home Feed", color: "from-blue-500 to-cyan-500", key: "home" },
              { icon: TrendingUp, label: "Trending", color: "from-orange-500 to-red-500", key: "trending" },
              { icon: Users, label: "Communities", color: "from-purple-500 to-pink-500", key: "communities" },
            ].map((item) => (
              <Button
                key={item.key}
                variant="ghost"
                onClick={() => handleNavigation(item.key, item.label)}
                className={`
                  w-full justify-start gap-4 h-12 rounded-xl transition-all duration-500 group transform-style-3d
                  ${
                    activeSection === item.key
                      ? "bg-blue-500/20 text-blue-600"
                      : hoveredItem === item.key
                        ? "bg-blue-500/10 text-blue-600 translate-z-[8px] rotate-x-[5deg] scale-105"
                        : "hover:bg-blue-500/10 hover:text-blue-600 translate-z-0 rotate-x-0 scale-100"
                  }
                `}
                onMouseEnter={() => setHoveredItem(item.key)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div
                  className={`
                    w-8 h-8 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center 
                    transition-all duration-500 transform-style-3d relative overflow-hidden
                    ${
                      hoveredItem === item.key || activeSection === item.key
                        ? "scale-125 rotate-[15deg] translate-z-[5px]"
                        : "scale-100 rotate-0 translate-z-0"
                    }
                  `}
                >
                  <div className="absolute inset-0 bg-white/10" />
                  <item.icon className="w-4 h-4 text-white relative z-10" />
                </div>
                <span className="font-medium">{item.label}</span>
                {activeSection === item.key && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Your Communities
              </span>
              <Dialog open={showCreateCommunity} onOpenChange={setShowCreateCommunity}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`
                      w-8 h-8 rounded-full hover:bg-blue-500/10 hover:text-blue-600 transition-all duration-300 transform-style-3d
                      ${hoveredItem === "add" ? "rotate-[90deg] scale-110 translate-z-[5px]" : "rotate-0 scale-100 translate-z-0"}
                    `}
                    onMouseEnter={() => setHoveredItem("add")}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Community</DialogTitle>
                    <DialogDescription>Start a new community around your interests</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="community-name">Community Name</Label>
                      <Input
                        id="community-name"
                        placeholder="awesome-community"
                        value={newCommunityName}
                        onChange={(e) => setNewCommunityName(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowCreateCommunity(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateCommunity} disabled={!newCommunityName.trim()}>
                        Create Community
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-2">
              {communities.map((community, index) => (
                <div
                  key={community.name}
                  className={`
                    group relative rounded-xl overflow-hidden transition-all duration-500 transform-style-3d
                    ${
                      hoveredItem === community.name
                        ? "translate-z-[8px] rotate-x-[3deg] scale-105"
                        : "translate-z-0 rotate-x-0 scale-100"
                    }
                  `}
                  onMouseEnter={() => setHoveredItem(community.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {/* Community Banner Background */}
                  <div className="absolute inset-0 opacity-10">
                    <Image
                      src={community.banner || "/placeholder.svg"}
                      alt={`${community.name} banner`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      onClick={() => handleCommunityClick(community.name)}
                      className="flex-1 justify-start gap-4 h-14 rounded-xl hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all duration-500 relative z-10"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div
                        className={`
                          w-10 h-10 bg-gradient-to-r ${community.color} rounded-xl flex items-center justify-center 
                          text-lg shadow-lg transition-all duration-500 transform-style-3d
                          ${
                            hoveredItem === community.name
                              ? "scale-125 rotate-[10deg] translate-z-[5px]"
                              : "scale-100 rotate-0 translate-z-0"
                          }
                        `}
                      >
                        {community.icon}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-sm">#{community.name}</div>
                        <div className="text-xs text-muted-foreground">{community.members} members</div>
                      </div>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleJoinCommunity(community.name, e)}
                      className={`
                        mr-2 text-xs px-3 py-1 rounded-full transition-all duration-300
                        ${
                          community.isJoined
                            ? "bg-green-500/20 text-green-600 hover:bg-green-500/30"
                            : "bg-blue-500/20 text-blue-600 hover:bg-blue-500/30"
                        }
                      `}
                    >
                      {community.isJoined ? "Joined" : "Join"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="relative z-10 p-6 border-t border-white/10">
        <div
          className={`
            flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 
            cursor-pointer group transition-all duration-500 transform-style-3d relative overflow-hidden
            ${
              hoveredItem === "profile"
                ? "from-blue-500/20 to-purple-500/20 translate-z-[8px] rotate-x-[5deg] scale-105"
                : "hover:from-blue-500/20 hover:to-purple-500/20 translate-z-0 rotate-x-0 scale-100"
            }
          `}
          onMouseEnter={() => setHoveredItem("profile")}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={() => {
            toast({
              title: "Opening profile",
              description: "Loading your profile and activity...",
            })
          }}
        >
          {/* Profile Background */}
          <div className="absolute inset-0 opacity-5">
            <Image
              src="/placeholder.svg?height=60&width=250&text=Profile+Background"
              alt="Profile background"
              fill
              className="object-cover"
            />
          </div>

          <Avatar
            className={`
              w-10 h-10 ring-2 ring-blue-500/20 transition-all duration-500 transform-style-3d relative z-10
              ${
                hoveredItem === "profile"
                  ? "ring-blue-500/40 scale-110 translate-z-[5px]"
                  : "ring-blue-500/20 scale-100 translate-z-0"
              }
            `}
          >
            <AvatarImage src="/placeholder.svg?height=40&width=40&text=JD" />
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 relative z-10">
            <div className="font-medium text-sm">john_doe</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <div
                className={`
                  w-2 h-2 bg-green-500 rounded-full transition-all duration-300
                  ${hoveredItem === "profile" ? "animate-pulse scale-125" : "animate-pulse scale-100"}
                `}
              />
              Online
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              handleProfileSettings()
            }}
            className={`
              w-8 h-8 rounded-full hover:bg-blue-500/10 transition-all duration-300 transform-style-3d relative z-10
              ${hoveredItem === "profile" ? "rotate-[90deg] scale-110 translate-z-[3px]" : "rotate-0 scale-100 translate-z-0"}
            `}
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
