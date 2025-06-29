"use client"

import { Plus, MessageSquare, Heart, Share, Zap, Camera, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react"

export function FloatingActions() {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleQuickPost = () => {
    toast({
      title: "Quick Post ✨",
      description: "Opening post composer...",
    })
  }

  const handleQuickMessage = () => {
    toast({
      title: "Quick Message 💬",
      description: "Opening message composer...",
    })
  }

  const handleQuickReaction = () => {
    toast({
      title: "Quick Reaction ❤️",
      description: "Sending love to the community!",
    })
  }

  const handleQuickShare = () => {
    toast({
      title: "Quick Share 🚀",
      description: "Opening share options...",
    })
  }

  const handleLiveStream = () => {
    toast({
      title: "Go Live! 📺",
      description: "Starting live stream setup...",
    })
  }

  const handleQuickPhoto = () => {
    toast({
      title: "Quick Photo 📸",
      description: "Opening camera for instant post...",
    })
  }

  const handleVoiceNote = () => {
    toast({
      title: "Voice Note 🎤",
      description: "Recording voice message...",
    })
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
    toast({
      title: isExpanded ? "Actions collapsed" : "Actions expanded",
      description: isExpanded ? "Quick actions hidden" : "More quick actions available",
    })
  }

  const actions = [
    { icon: Heart, label: "Quick Reaction", action: handleQuickReaction, color: "from-pink-500 to-rose-500" },
    { icon: MessageSquare, label: "Quick Message", action: handleQuickMessage, color: "from-blue-500 to-cyan-500" },
    { icon: Share, label: "Quick Share", action: handleQuickShare, color: "from-purple-500 to-indigo-500" },
    { icon: Camera, label: "Quick Photo", action: handleQuickPhoto, color: "from-green-500 to-emerald-500" },
    { icon: Mic, label: "Voice Note", action: handleVoiceNote, color: "from-orange-500 to-red-500" },
    { icon: Zap, label: "Go Live", action: handleLiveStream, color: "from-yellow-500 to-amber-500" },
  ]

  return (
    <TooltipProvider>
      <div
        className="fixed bottom-8 right-8 flex flex-col gap-3 z-50 perspective-[1000px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Expanded Actions */}
        {(isExpanded || isHovered) && (
          <div className="flex flex-col gap-2">
            {actions.map((action, index) => (
              <Tooltip key={action.label}>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    onClick={action.action}
                    className={`
                      w-12 h-12 rounded-full bg-gradient-to-r ${action.color} hover:scale-110
                      shadow-lg hover:shadow-xl transition-all duration-500 group transform-style-3d
                      animate-in slide-in-from-right-4 fade-in-0
                      ${
                        isHovered || isExpanded
                          ? `translate-z-[${8 + index * 2}px] rotate-x-[5deg] rotate-y-[-8deg] scale-105`
                          : "translate-z-0 rotate-x-0 rotate-y-0 scale-100"
                      }
                    `}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      transitionDelay: `${index * 50}ms`,
                    }}
                  >
                    <action.icon
                      className={`
                        w-5 h-5 text-white transition-all duration-300 transform-style-3d
                        ${isHovered ? "scale-125 rotate-[15deg]" : "scale-100 rotate-0"}
                      `}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>{action.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        )}

        {/* Main Action Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              onClick={isExpanded ? toggleExpanded : handleQuickPost}
              onDoubleClick={toggleExpanded}
              className={`
                w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 
                shadow-2xl hover:shadow-3xl transition-all duration-500 group transform-style-3d
                ${
                  isHovered || isExpanded
                    ? "translate-z-[20px] rotate-x-[15deg] rotate-y-[10deg] scale-110"
                    : "translate-z-0 rotate-x-0 rotate-y-0 scale-100"
                }
              `}
            >
              <Plus
                className={`
                  w-6 h-6 text-white transition-all duration-500 transform-style-3d
                  ${isExpanded ? "rotate-[45deg] scale-125" : isHovered ? "rotate-[180deg] scale-125" : "rotate-0 scale-100"}
                `}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>{isExpanded ? "Close Actions" : "Create Post (Double-click for more)"}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
