"use client"

import {
  ArrowUp,
  ArrowDown,
  MessageSquare,
  Share,
  Bookmark,
  MoreHorizontal,
  Flame,
  Sparkles,
  Heart,
  Zap,
  Play,
  Flag,
  Copy,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { useState } from "react"

interface Post {
  id: number
  title: string
  content: string
  author: string
  community: string
  timestamp: string
  upvotes: number
  downvotes: number
  comments: number
  image?: string | null
  images?: string[]
  video?: string | null
  tags: string[]
  type: string
  engagement: number
  authorAvatar?: string
}

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [localUpvotes, setLocalUpvotes] = useState(post.upvotes)
  const [localDownvotes, setLocalDownvotes] = useState(post.downvotes)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [isSharing, setIsSharing] = useState(false)

  const handleUpvote = () => {
    if (userVote === "up") {
      setUserVote(null)
      setLocalUpvotes((prev) => prev - 1)
      toast({
        title: "Vote removed",
        description: "Your upvote has been removed.",
      })
    } else {
      if (userVote === "down") {
        setLocalDownvotes((prev) => prev - 1)
      }
      setUserVote("up")
      setLocalUpvotes((prev) => prev + (userVote === "down" ? 2 : 1))
      toast({
        title: "Upvoted! 👍",
        description: "Thanks for your feedback!",
      })
    }
  }

  const handleDownvote = () => {
    if (userVote === "down") {
      setUserVote(null)
      setLocalDownvotes((prev) => prev - 1)
      toast({
        title: "Vote removed",
        description: "Your downvote has been removed.",
      })
    } else {
      if (userVote === "up") {
        setLocalUpvotes((prev) => prev - 1)
      }
      setUserVote("down")
      setLocalDownvotes((prev) => prev + (userVote === "up" ? 2 : 1))
      toast({
        title: "Downvoted",
        description: "Thanks for your feedback.",
      })
    }
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    toast({
      title: isBookmarked ? "Bookmark removed" : "Bookmarked! 🔖",
      description: isBookmarked ? "Post removed from bookmarks." : "Post saved to your bookmarks.",
    })
  }

  const handleShare = async () => {
    setIsSharing(true)
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: post.content,
          url: `${window.location.origin}/post/${post.id}`,
        })
        toast({
          title: "Shared successfully! 🚀",
          description: "Post shared via native sharing.",
        })
      } else {
        await navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`)
        toast({
          title: "Link copied! 📋",
          description: "Post link copied to clipboard.",
        })
      }
    } catch (error) {
      toast({
        title: "Share failed",
        description: "Unable to share post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSharing(false)
    }
  }

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      toast({
        title: "Comment posted! 💬",
        description: "Your comment has been added to the discussion.",
      })
      setNewComment("")
      setShowComments(false)
    }
  }

  const handleTagClick = (tag: string) => {
    toast({
      title: `Exploring #${tag}`,
      description: "Showing all posts with this tag.",
    })
  }

  const handleAuthorClick = () => {
    toast({
      title: `Viewing u/${post.author}'s profile`,
      description: "Loading user profile and posts.",
    })
  }

  const handleCommunityClick = () => {
    toast({
      title: `Joining #${post.community}`,
      description: "Loading community posts and discussions.",
    })
  }

  const handleReportPost = () => {
    toast({
      title: "Post reported",
      description: "Thank you for helping keep our community safe.",
    })
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`)
      toast({
        title: "Link copied! 📋",
        description: "Post link copied to clipboard.",
      })
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy link. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "hot":
        return <Flame className="w-4 h-4 text-orange-500" />
      case "trending":
        return <Zap className="w-4 h-4 text-blue-500" />
      case "inspiring":
        return <Heart className="w-4 h-4 text-pink-500" />
      default:
        return <Sparkles className="w-4 h-4 text-purple-500" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "hot":
        return "from-orange-500/20 to-red-500/20 border-orange-200"
      case "trending":
        return "from-blue-500/20 to-cyan-500/20 border-blue-200"
      case "inspiring":
        return "from-pink-500/20 to-rose-500/20 border-pink-200"
      default:
        return "from-purple-500/20 to-indigo-500/20 border-purple-200"
    }
  }

  const getAuthorAvatar = (author: string) => {
    const avatars = {
      alex_dev: "/placeholder.svg?height=100&width=100&text=AD",
      sarah_codes: "/placeholder.svg?height=100&width=100&text=SC",
      tech_guru: "/placeholder.svg?height=100&width=100&text=TG",
      design_wizard: "/placeholder.svg?height=100&width=100&text=DW",
      code_ninja: "/placeholder.svg?height=100&width=100&text=CN",
    }
    return avatars[author as keyof typeof avatars] || "/placeholder.svg?height=100&width=100&text=U"
  }

  return (
    <div
      className="perspective-[1000px] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        className={`
          transform-style-3d transition-all duration-700 ease-out cursor-pointer
          ${
            isHovered
              ? "rotate-x-[8deg] rotate-y-[5deg] translate-z-[20px] scale-[1.02]"
              : "rotate-x-0 rotate-y-0 translate-z-0 scale-100"
          }
          hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.1)]
          border-0 bg-gradient-to-br ${getTypeColor(post.type)} backdrop-blur-sm relative overflow-hidden
          before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/60 before:to-white/30 
          dark:before:from-slate-800/60 dark:before:to-slate-900/30 before:transition-all before:duration-700
          ${isHovered ? "before:from-white/80 before:to-white/50 dark:before:from-slate-700/80 dark:before:to-slate-800/50" : ""}
        `}
      >
        {/* 3D Floating Background Elements */}
        <div
          className={`
            absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 
            rounded-full blur-3xl transition-all duration-700 transform-style-3d
            ${isHovered ? "scale-150 translate-z-[10px] rotate-[45deg]" : "scale-100 translate-z-0 rotate-0"}
          `}
        />
        <div
          className={`
            absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-pink-500/10 to-orange-500/10 
            rounded-full blur-2xl transition-all duration-500 transform-style-3d
            ${isHovered ? "scale-125 translate-z-[5px] rotate-[-30deg]" : "scale-100 translate-z-0 rotate-0"}
          `}
        />

        <CardHeader className="pb-4 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`
                  transition-all duration-500 transform-style-3d cursor-pointer
                  ${isHovered ? "translate-z-[15px] rotate-y-[15deg]" : "translate-z-0 rotate-y-0"}
                `}
                onClick={handleAuthorClick}
              >
                <Avatar className="w-12 h-12 ring-2 ring-white/50 group-hover:ring-blue-500/30 transition-all shadow-lg">
                  <AvatarImage src={getAuthorAvatar(post.author) || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">
                    {post.author[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div
                className={`
                  flex flex-col gap-1 transition-all duration-500 transform-style-3d
                  ${isHovered ? "translate-z-[10px]" : "translate-z-0"}
                `}
              >
                <div className="flex items-center gap-2 text-sm">
                  <span
                    className="font-bold text-foreground hover:text-blue-600 cursor-pointer transition-colors"
                    onClick={handleAuthorClick}
                  >
                    u/{post.author}
                  </span>
                  <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                  <span
                    className="text-muted-foreground hover:text-purple-600 cursor-pointer transition-colors"
                    onClick={handleCommunityClick}
                  >
                    #{post.community}
                  </span>
                  <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                  <span className="text-muted-foreground">{post.timestamp}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`
                      transition-all duration-300 transform-style-3d
                      ${isHovered ? "translate-z-[5px] rotate-[360deg]" : "translate-z-0 rotate-0"}
                    `}
                  >
                    {getTypeIcon(post.type)}
                  </div>
                  <span className="text-xs font-medium capitalize">{post.type}</span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <div
                      className={`
                        w-2 h-2 bg-green-500 rounded-full transition-all duration-300
                        ${isHovered ? "animate-pulse scale-125" : "animate-pulse scale-100"}
                      `}
                    />
                    {post.engagement}% engagement
                  </div>
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`
                    w-10 h-10 rounded-full hover:bg-white/50 transition-all duration-300 transform-style-3d
                    ${isHovered ? "translate-z-[8px] rotate-[90deg]" : "translate-z-0 rotate-0"}
                  `}
                >
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={handleCopyLink}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Link
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => window.open(`/post/${post.id}`, "_blank")}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open in New Tab
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleReportPost} className="text-red-600">
                  <Flag className="w-4 h-4 mr-2" />
                  Report Post
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="pt-0 relative z-10">
          <div className="space-y-4">
            <h2
              className={`
                text-xl font-bold leading-tight hover:text-blue-600 cursor-pointer transition-all duration-500 transform-style-3d
                ${isHovered ? "translate-z-[12px] text-blue-600" : "translate-z-0"}
              `}
              onClick={() => {
                toast({
                  title: "Opening post",
                  description: "Loading full post content...",
                })
              }}
            >
              {post.title}
            </h2>

            <p
              className={`
                text-muted-foreground leading-relaxed transition-all duration-500 transform-style-3d
                ${isHovered ? "translate-z-[8px]" : "translate-z-0"}
              `}
            >
              {post.content}
            </p>

            {/* Single Image */}
            {post.image && !post.images && (
              <div
                className={`
                  rounded-2xl overflow-hidden shadow-lg transition-all duration-700 transform-style-3d relative cursor-pointer
                  ${
                    isHovered
                      ? "shadow-2xl translate-z-[15px] rotate-x-[5deg] scale-[1.02]"
                      : "shadow-lg translate-z-0 rotate-x-0 scale-100"
                  }
                `}
                onClick={() => {
                  toast({
                    title: "Opening image viewer",
                    description: "Loading full-size image...",
                  })
                }}
              >
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt="Post image"
                  width={700}
                  height={400}
                  className={`
                    w-full h-auto object-cover transition-all duration-700
                    ${isHovered ? "scale-110 brightness-110" : "scale-100 brightness-100"}
                  `}
                />
                {post.video && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <Button
                      size="icon"
                      className="w-16 h-16 rounded-full bg-white/90 hover:bg-white text-black hover:scale-110 transition-all"
                      onClick={(e) => {
                        e.stopPropagation()
                        toast({
                          title: "Playing video 🎬",
                          description: "Loading video player...",
                        })
                      }}
                    >
                      <Play className="w-8 h-8 ml-1" />
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Image Gallery */}
            {post.images && post.images.length > 0 && (
              <div
                className={`
                  space-y-3 transition-all duration-700 transform-style-3d
                  ${isHovered ? "translate-z-[15px]" : "translate-z-0"}
                `}
              >
                <div
                  className="rounded-2xl overflow-hidden shadow-lg relative cursor-pointer"
                  onClick={() => {
                    toast({
                      title: "Opening gallery viewer",
                      description: `Viewing image ${currentImageIndex + 1} of ${post.images?.length}`,
                    })
                  }}
                >
                  <Image
                    src={post.images[currentImageIndex] || "/placeholder.svg"}
                    alt={`Post image ${currentImageIndex + 1}`}
                    width={700}
                    height={400}
                    className={`
                      w-full h-auto object-cover transition-all duration-700
                      ${isHovered ? "scale-105 brightness-110" : "scale-100 brightness-100"}
                    `}
                  />
                  {post.images.length > 1 && (
                    <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                      {currentImageIndex + 1} / {post.images.length}
                    </div>
                  )}
                </div>

                {post.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {post.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentImageIndex(index)
                          toast({
                            title: `Viewing image ${index + 1}`,
                            description: `Switched to image ${index + 1} of ${post.images?.length}`,
                          })
                        }}
                        className={`
                          flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all
                          ${
                            index === currentImageIndex
                              ? "border-blue-500 scale-110"
                              : "border-white/20 hover:border-blue-300"
                          }
                        `}
                      >
                        <Image
                          src={img || "/placeholder.svg"}
                          alt={`Thumbnail ${index + 1}`}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className={`
                    text-xs px-3 py-1 rounded-full bg-white/50 hover:bg-blue-500/10 hover:text-blue-600 
                    cursor-pointer transition-all duration-300 transform-style-3d
                    animate-in fade-in-0 slide-in-from-bottom-2
                    ${isHovered ? `translate-z-[${5 + index * 2}px] rotate-x-[10deg]` : "translate-z-0 rotate-x-0"}
                  `}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    transitionDelay: `${index * 50}ms`,
                  }}
                  onClick={() => handleTagClick(tag)}
                >
                  #{tag}
                </Badge>
              ))}
            </div>

            <div
              className={`
                flex items-center justify-between pt-4 border-t border-white/20 transition-all duration-500 transform-style-3d
                ${isHovered ? "translate-z-[10px]" : "translate-z-0"}
              `}
            >
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleUpvote}
                  className={`
                    gap-2 h-10 px-4 rounded-xl transition-all duration-300 group/vote transform-style-3d
                    ${
                      userVote === "up"
                        ? "bg-green-500/20 text-green-600 hover:bg-green-500/30"
                        : "hover:bg-green-500/10 hover:text-green-600"
                    }
                    ${isHovered ? "translate-z-[5px] hover:translate-z-[8px]" : "translate-z-0"}
                  `}
                >
                  <ArrowUp
                    className={`w-5 h-5 group-hover/vote:scale-110 group-hover/vote:translate-y-[-2px] transition-all ${userVote === "up" ? "scale-110" : ""}`}
                  />
                  <span className="font-bold">{localUpvotes.toLocaleString()}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDownvote}
                  className={`
                    gap-2 h-10 px-4 rounded-xl transition-all duration-300 group/vote transform-style-3d
                    ${
                      userVote === "down"
                        ? "bg-red-500/20 text-red-600 hover:bg-red-500/30"
                        : "hover:bg-red-500/10 hover:text-red-600"
                    }
                    ${isHovered ? "translate-z-[5px] hover:translate-z-[8px]" : "translate-z-0"}
                  `}
                >
                  <ArrowDown
                    className={`w-5 h-5 group-hover/vote:scale-110 group-hover/vote:translate-y-[2px] transition-all ${userVote === "down" ? "scale-110" : ""}`}
                  />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Dialog open={showComments} onOpenChange={setShowComments}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`
                        gap-2 h-10 px-4 rounded-xl hover:bg-blue-500/10 hover:text-blue-600 
                        transition-all duration-300 group/action transform-style-3d
                        ${isHovered ? "translate-z-[5px] hover:translate-z-[8px]" : "translate-z-0"}
                      `}
                    >
                      <MessageSquare className="w-5 h-5 group-hover/action:scale-110 group-hover/action:rotate-[5deg] transition-all" />
                      <span className="font-medium">{post.comments}</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Comments</DialogTitle>
                      <DialogDescription>Join the discussion about this post</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Textarea
                          placeholder="Write a comment..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="min-h-[100px]"
                        />
                        <div className="flex justify-end">
                          <Button onClick={handleCommentSubmit} disabled={!newComment.trim()}>
                            Post Comment
                          </Button>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">Comments will appear here once posted.</div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  disabled={isSharing}
                  className={`
                    gap-2 h-10 px-4 rounded-xl hover:bg-purple-500/10 hover:text-purple-600 
                    transition-all duration-300 group/action transform-style-3d
                    ${isHovered ? "translate-z-[5px] hover:translate-z-[8px]" : "translate-z-0"}
                  `}
                >
                  <Share className="w-5 h-5 group-hover/action:scale-110 group-hover/action:rotate-[15deg] transition-all" />
                  <span className="font-medium">{isSharing ? "Sharing..." : "Share"}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBookmark}
                  className={`
                    w-10 h-10 rounded-xl transition-all duration-300 group/action transform-style-3d
                    ${
                      isBookmarked
                        ? "bg-yellow-500/20 text-yellow-600 hover:bg-yellow-500/30"
                        : "hover:bg-yellow-500/10 hover:text-yellow-600"
                    }
                    ${isHovered ? "translate-z-[5px] hover:translate-z-[8px]" : "translate-z-0"}
                  `}
                >
                  <Bookmark
                    className={`w-5 h-5 group-hover/action:scale-110 group-hover/action:rotate-[10deg] transition-all ${isBookmarked ? "fill-current" : ""}`}
                  />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
