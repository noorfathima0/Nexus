"use client"

import type React from "react"

import { Users, Zap, Flame, Crown, MapPin, ExternalLink, UserPlus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { useState } from "react"
import Image from "next/image"

export function TrendingPanel() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [followedCreators, setFollowedCreators] = useState<string[]>(["alex_dev"])

  const trendingTopics = [
    {
      name: "React 19",
      posts: 2340,
      trend: "+25%",
      color: "from-blue-500 to-cyan-500",
      image: "/placeholder.svg?height=40&width=40&text=React",
    },
    {
      name: "AI Revolution",
      posts: 1890,
      trend: "+45%",
      color: "from-purple-500 to-pink-500",
      image: "/placeholder.svg?height=40&width=40&text=AI",
    },
    {
      name: "Web3 Future",
      posts: 1560,
      trend: "+18%",
      color: "from-green-500 to-emerald-500",
      image: "/placeholder.svg?height=40&width=40&text=Web3",
    },
    {
      name: "Design Systems",
      posts: 1430,
      trend: "+32%",
      color: "from-orange-500 to-red-500",
      image: "/placeholder.svg?height=40&width=40&text=Design",
    },
    {
      name: "TypeScript Magic",
      posts: 980,
      trend: "+12%",
      color: "from-indigo-500 to-purple-500",
      image: "/placeholder.svg?height=40&width=40&text=TS",
    },
  ]

  const topCreators = [
    {
      name: "alex_dev",
      posts: 156,
      followers: "12.5k",
      badge: "🏆",
      avatar: "/placeholder.svg?height=40&width=40&text=AD",
      specialty: "Full Stack",
      isFollowed: followedCreators.includes("alex_dev"),
    },
    {
      name: "sarah_codes",
      posts: 134,
      followers: "8.2k",
      badge: "🥈",
      avatar: "/placeholder.svg?height=40&width=40&text=SC",
      specialty: "Frontend",
      isFollowed: followedCreators.includes("sarah_codes"),
    },
    {
      name: "tech_guru",
      posts: 128,
      followers: "15.7k",
      badge: "🥉",
      avatar: "/placeholder.svg?height=40&width=40&text=TG",
      specialty: "DevOps",
      isFollowed: followedCreators.includes("tech_guru"),
    },
    {
      name: "design_wizard",
      posts: 98,
      followers: "6.9k",
      badge: "⭐",
      avatar: "/placeholder.svg?height=40&width=40&text=DW",
      specialty: "UI/UX",
      isFollowed: followedCreators.includes("design_wizard"),
    },
  ]

  const liveEvents = [
    {
      name: "React Conf 2024",
      time: "2h",
      viewers: "2.3k",
      status: "live",
      image: "/placeholder.svg?height=60&width=100&text=React+Conf",
      location: "San Francisco",
    },
    {
      name: "Design Workshop",
      time: "4h",
      viewers: "1.8k",
      status: "upcoming",
      image: "/placeholder.svg?height=60&width=100&text=Design+Workshop",
      location: "Online",
    },
    {
      name: "AI Hackathon",
      time: "1d",
      viewers: "956",
      status: "upcoming",
      image: "/placeholder.svg?height=60&width=100&text=AI+Hackathon",
      location: "New York",
    },
  ]

  const handleTopicClick = (topicName: string) => {
    toast({
      title: `Exploring ${topicName}`,
      description: "Loading trending posts and discussions...",
    })
  }

  const handleFollowCreator = (creatorName: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const isCurrentlyFollowed = followedCreators.includes(creatorName)

    if (isCurrentlyFollowed) {
      setFollowedCreators((prev) => prev.filter((name) => name !== creatorName))
      toast({
        title: `Unfollowed ${creatorName}`,
        description: "You'll no longer see their updates in your feed.",
      })
    } else {
      setFollowedCreators((prev) => [...prev, creatorName])
      toast({
        title: `Following ${creatorName}! 🎉`,
        description: "You'll now see their latest posts and updates.",
      })
    }
  }

  const handleCreatorClick = (creatorName: string) => {
    toast({
      title: `Viewing ${creatorName}'s profile`,
      description: "Loading their posts and activity...",
    })
  }

  const handleEventClick = (eventName: string, status: string) => {
    if (status === "live") {
      toast({
        title: `Joining ${eventName} 🔴`,
        description: "Opening live stream...",
      })
    } else {
      toast({
        title: `Interested in ${eventName}`,
        description: "You'll be notified when the event starts!",
      })
    }
  }

  const handleEventShare = (eventName: string, e: React.MouseEvent) => {
    e.stopPropagation()
    toast({
      title: `Sharing ${eventName}`,
      description: "Event link copied to clipboard!",
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div
        className="transform-style-3d"
        onMouseEnter={() => setHoveredCard("trending")}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <Card
          className={`
            border-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm relative overflow-hidden
            transition-all duration-700 ease-out transform-style-3d cursor-pointer
            ${
              hoveredCard === "trending"
                ? "rotate-x-[10deg] rotate-y-[-5deg] translate-z-[15px] scale-[1.02] shadow-2xl"
                : "rotate-x-0 rotate-y-0 translate-z-0 scale-100 shadow-lg"
            }
          `}
        >
          {/* Background Image */}
          <div className="absolute inset-0 opacity-5">
            <Image
              src="/placeholder.svg?height=300&width=300&text=Trending+Background"
              alt="Trending background"
              fill
              className="object-cover"
            />
          </div>

          <div
            className={`
              absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-500/20 to-red-500/20 
              rounded-full blur-2xl transition-all duration-500 transform-style-3d
              ${hoveredCard === "trending" ? "scale-150 translate-z-[10px] rotate-[90deg]" : "scale-100 translate-z-0 rotate-0"}
            `}
          />
          <CardHeader className="pb-4 relative z-10">
            <CardTitle
              className={`
                text-lg flex items-center gap-3 transition-all duration-500 transform-style-3d
                ${hoveredCard === "trending" ? "translate-z-[10px]" : "translate-z-0"}
              `}
            >
              <div
                className={`
                  w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center
                  transition-all duration-500 transform-style-3d
                  ${hoveredCard === "trending" ? "translate-z-[15px] rotate-[360deg] scale-110" : "translate-z-0 rotate-0 scale-100"}
                `}
              >
                <Flame className="w-4 h-4 text-white" />
              </div>
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Trending Now
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            {trendingTopics.map((topic, index) => (
              <div
                key={topic.name}
                onClick={() => handleTopicClick(topic.name)}
                className={`
                  flex items-center justify-between group hover:bg-white/20 p-2 rounded-xl 
                  transition-all duration-300 cursor-pointer transform-style-3d
                  ${
                    hoveredCard === "trending"
                      ? `translate-z-[${5 + index * 2}px] rotate-x-[5deg]`
                      : "translate-z-0 rotate-x-0"
                  }
                `}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-muted-foreground w-6">#{index + 1}</span>
                    <div className="w-8 h-8 rounded-lg overflow-hidden">
                      <Image
                        src={topic.image || "/placeholder.svg"}
                        alt={topic.name}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-sm group-hover:text-orange-600 transition-colors">
                      {topic.name}
                    </div>
                    <div className="text-xs text-muted-foreground">{topic.posts.toLocaleString()} posts</div>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className={`
                    bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-700 border-green-200
                    transition-all duration-300 transform-style-3d
                    ${hoveredCard === "trending" ? "translate-z-[3px] scale-110" : "translate-z-0 scale-100"}
                  `}
                >
                  {topic.trend}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div
        className="transform-style-3d"
        onMouseEnter={() => setHoveredCard("creators")}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <Card
          className={`
            border-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm relative overflow-hidden
            transition-all duration-700 ease-out transform-style-3d cursor-pointer
            ${
              hoveredCard === "creators"
                ? "rotate-x-[10deg] rotate-y-[5deg] translate-z-[15px] scale-[1.02] shadow-2xl"
                : "rotate-x-0 rotate-y-0 translate-z-0 scale-100 shadow-lg"
            }
          `}
        >
          {/* Background Image */}
          <div className="absolute inset-0 opacity-5">
            <Image
              src="/placeholder.svg?height=300&width=300&text=Creators+Background"
              alt="Creators background"
              fill
              className="object-cover"
            />
          </div>

          <div
            className={`
              absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 
              rounded-full blur-2xl transition-all duration-500 transform-style-3d
              ${hoveredCard === "creators" ? "scale-150 translate-z-[10px] rotate-[-90deg]" : "scale-100 translate-z-0 rotate-0"}
            `}
          />
          <CardHeader className="pb-4 relative z-10">
            <CardTitle
              className={`
                text-lg flex items-center gap-3 transition-all duration-500 transform-style-3d
                ${hoveredCard === "creators" ? "translate-z-[10px]" : "translate-z-0"}
              `}
            >
              <div
                className={`
                  w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center
                  transition-all duration-500 transform-style-3d
                  ${hoveredCard === "creators" ? "translate-z-[15px] rotate-[360deg] scale-110" : "translate-z-0 rotate-0 scale-100"}
                `}
              >
                <Crown className="w-4 h-4 text-white" />
              </div>
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Top Creators
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            {topCreators.map((creator, index) => (
              <div
                key={creator.name}
                className={`
                  flex items-center gap-3 group hover:bg-white/20 p-2 rounded-xl 
                  transition-all duration-300 cursor-pointer transform-style-3d
                  ${
                    hoveredCard === "creators"
                      ? `translate-z-[${5 + index * 2}px] rotate-x-[5deg]`
                      : "translate-z-0 rotate-x-0"
                  }
                `}
                style={{ transitionDelay: `${index * 50}ms` }}
                onClick={() => handleCreatorClick(creator.name)}
              >
                <div
                  className={`
                    text-2xl transition-all duration-300 transform-style-3d
                    ${hoveredCard === "creators" ? "translate-z-[5px] scale-125 rotate-[15deg]" : "translate-z-0 scale-100 rotate-0"}
                  `}
                >
                  {creator.badge}
                </div>
                <Avatar
                  className={`
                    w-10 h-10 ring-2 ring-purple-500/20 group-hover:ring-purple-500/40 
                    transition-all duration-300 transform-style-3d
                    ${hoveredCard === "creators" ? "translate-z-[8px] scale-110" : "translate-z-0 scale-100"}
                  `}
                >
                  <AvatarImage src={creator.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                    {creator.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-semibold text-sm group-hover:text-purple-600 transition-colors">
                    u/{creator.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {creator.specialty} • {creator.followers} followers
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => handleFollowCreator(creator.name, e)}
                  className={`
                    text-xs px-3 py-1 rounded-full transition-all duration-300
                    ${
                      creator.isFollowed
                        ? "bg-purple-500/20 text-purple-600 hover:bg-purple-500/30"
                        : "bg-blue-500/20 text-blue-600 hover:bg-blue-500/30"
                    }
                  `}
                >
                  <UserPlus className="w-3 h-3 mr-1" />
                  {creator.isFollowed ? "Following" : "Follow"}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div
        className="transform-style-3d"
        onMouseEnter={() => setHoveredCard("events")}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <Card
          className={`
            border-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm relative overflow-hidden
            transition-all duration-700 ease-out transform-style-3d cursor-pointer
            ${
              hoveredCard === "events"
                ? "rotate-x-[10deg] rotate-y-[-5deg] translate-z-[15px] scale-[1.02] shadow-2xl"
                : "rotate-x-0 rotate-y-0 translate-z-0 scale-100 shadow-lg"
            }
          `}
        >
          {/* Background Image */}
          <div className="absolute inset-0 opacity-5">
            <Image
              src="/placeholder.svg?height=300&width=300&text=Events+Background"
              alt="Events background"
              fill
              className="object-cover"
            />
          </div>

          <div
            className={`
              absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 
              rounded-full blur-2xl transition-all duration-500 transform-style-3d
              ${hoveredCard === "events" ? "scale-150 translate-z-[10px] rotate-[180deg]" : "scale-100 translate-z-0 rotate-0"}
            `}
          />
          <CardHeader className="pb-4 relative z-10">
            <CardTitle
              className={`
                text-lg flex items-center gap-3 transition-all duration-500 transform-style-3d
                ${hoveredCard === "events" ? "translate-z-[10px]" : "translate-z-0"}
              `}
            >
              <div
                className={`
                  w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center
                  transition-all duration-500 transform-style-3d
                  ${hoveredCard === "events" ? "translate-z-[15px] rotate-[360deg] scale-110" : "translate-z-0 rotate-0 scale-100"}
                `}
              >
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Live Events
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            {liveEvents.map((event, index) => (
              <div
                key={event.name}
                onClick={() => handleEventClick(event.name, event.status)}
                className={`
                  group hover:bg-white/20 p-3 rounded-xl 
                  transition-all duration-300 cursor-pointer transform-style-3d
                  ${
                    hoveredCard === "events"
                      ? `translate-z-[${5 + index * 2}px] rotate-x-[5deg]`
                      : "translate-z-0 rotate-x-0"
                  }
                `}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-8 rounded-lg overflow-hidden">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.name}
                      width={48}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-sm group-hover:text-blue-600 transition-colors">
                        {event.name}
                      </div>
                      <div className="flex items-center gap-2">
                        {event.status === "live" ? (
                          <div className="flex items-center gap-1">
                            <div
                              className={`
                                w-2 h-2 bg-red-500 rounded-full transition-all duration-300
                                ${hoveredCard === "events" ? "animate-pulse scale-125" : "animate-pulse scale-100"}
                              `}
                            />
                            <span className="text-xs font-medium text-red-600">LIVE</span>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">in {event.time}</span>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => handleEventShare(event.name, e)}
                          className="w-6 h-6 p-0 hover:bg-blue-500/20"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>
                          {event.viewers} {event.status === "live" ? "watching" : "interested"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
