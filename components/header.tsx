"use client"

import type React from "react"

import { Bell, MessageSquare, Plus, Search, Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [postTitle, setPostTitle] = useState("")
  const [postContent, setPostContent] = useState("")
  const [selectedCommunity, setSelectedCommunity] = useState("general")
  const [notifications] = useState([
    { id: 1, type: "upvote", message: "Your post got 50 upvotes!", time: "2m ago" },
    { id: 2, type: "comment", message: "New comment on your post", time: "5m ago" },
    { id: 3, type: "follow", message: "alex_dev started following you", time: "1h ago" },
  ])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      toast({
        title: `Searching for "${searchQuery}" 🔍`,
        description: "Loading search results...",
      })
      setSearchQuery("")
    }
  }

  const handleCreatePost = () => {
    if (postTitle.trim() && postContent.trim()) {
      toast({
        title: "Post created! 🎉",
        description: `Your post "${postTitle}" has been published to #${selectedCommunity}`,
      })
      setPostTitle("")
      setPostContent("")
      setShowCreatePost(false)
    } else {
      toast({
        title: "Missing information",
        description: "Please fill in both title and content.",
        variant: "destructive",
      })
    }
  }

  const handleNotificationClick = (notification: any) => {
    toast({
      title: "Opening notification",
      description: notification.message,
    })
  }

  const handleProfileClick = () => {
    toast({
      title: "Opening profile",
      description: "Loading your profile page...",
    })
  }

  const handleMessagesClick = () => {
    toast({
      title: "Opening messages 💬",
      description: "Loading your conversations...",
    })
  }

  const handleKeyboardShortcut = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault()
      document.getElementById("search-input")?.focus()
      toast({
        title: "Search activated",
        description: "Start typing to search...",
      })
    }
  }

  return (
    <header
      className="h-20 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-white/20 flex items-center justify-between px-8 relative overflow-hidden"
      onKeyDown={handleKeyboardShortcut}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5" />
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute top-0 right-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="flex items-center gap-6 flex-1 relative z-10">
        <form onSubmit={handleSearch} className="relative max-w-2xl w-full group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-blue-500 transition-colors" />
          <Input
            id="search-input"
            placeholder="Search the universe of knowledge..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-16 h-12 bg-white/60 dark:bg-slate-800/60 border-white/30 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-2xl backdrop-blur-sm text-base placeholder:text-muted-foreground/70"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="h-6 w-6 p-0 hover:bg-muted/50"
              >
                <X className="w-3 h-3" />
              </Button>
            )}
            <kbd className="px-2 py-1 text-xs bg-muted/50 rounded border">⌘K</kbd>
          </div>
        </form>
      </div>

      <div className="flex items-center gap-3 relative z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative w-11 h-11 rounded-xl hover:bg-blue-500/10 hover:text-blue-600 transition-all duration-200 group"
            >
              <Bell className="w-5 h-5 group-hover:animate-bounce" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-xs flex items-center justify-center text-white font-bold animate-pulse">
                  {notifications.length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-2">
              <h3 className="font-semibold mb-2">Notifications</h3>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-2 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors"
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
              {notifications.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No new notifications</p>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleMessagesClick}
          className="w-11 h-11 rounded-xl hover:bg-purple-500/10 hover:text-purple-600 transition-all duration-200 group"
        >
          <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </Button>

        <Dialog open={showCreatePost} onOpenChange={setShowCreatePost}>
          <DialogTrigger asChild>
            <Button className="gap-3 h-11 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group">
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
              <span className="font-medium">Create Magic</span>
              <Sparkles className="w-4 h-4 group-hover:animate-spin" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create a New Post</DialogTitle>
              <DialogDescription>Share your thoughts, ideas, or questions with the community</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="post-title">Title</Label>
                <Input
                  id="post-title"
                  placeholder="What's on your mind?"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="post-content">Content</Label>
                <Textarea
                  id="post-content"
                  placeholder="Tell us more..."
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="community">Community</Label>
                <select
                  id="community"
                  value={selectedCommunity}
                  onChange={(e) => setSelectedCommunity(e.target.value)}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  <option value="general">General</option>
                  <option value="tech-discussion">Tech Discussion</option>
                  <option value="design-showcase">Design Showcase</option>
                  <option value="random">Random</option>
                  <option value="help-support">Help & Support</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowCreatePost(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreatePost} disabled={!postTitle.trim() || !postContent.trim()}>
                  Publish Post
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="w-px h-8 bg-white/20 mx-2" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="w-11 h-11 ring-2 ring-gradient-to-r from-blue-500/30 to-purple-500/30 hover:ring-blue-500/50 transition-all cursor-pointer">
              <AvatarImage src="/placeholder.svg?height=44&width=44&text=JD" />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">
                JD
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={handleProfileClick}>
              <div className="flex flex-col">
                <span className="font-medium">john_doe</span>
                <span className="text-sm text-muted-foreground">View Profile</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => toast({ title: "Opening settings", description: "Loading preferences..." })}
            >
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => toast({ title: "Opening bookmarks", description: "Loading saved posts..." })}
            >
              Bookmarks
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast({ title: "Opening help", description: "Loading help center..." })}>
              Help & Support
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => toast({ title: "Signing out", description: "See you later! 👋" })}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
