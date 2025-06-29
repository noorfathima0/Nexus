import { TrendingUp, Users, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function TrendingTopics() {
  const trendingTopics = [
    { name: "React 19", posts: 234, trend: "+15%" },
    { name: "TypeScript", posts: 189, trend: "+8%" },
    { name: "Next.js 15", posts: 156, trend: "+22%" },
    { name: "AI Development", posts: 143, trend: "+31%" },
    { name: "Web Performance", posts: 98, trend: "+12%" },
  ]

  const upcomingEvents = [
    { name: "React Conf 2024", date: "Dec 15", attendees: "2.3k" },
    { name: "JS Nation", date: "Dec 20", attendees: "1.8k" },
    { name: "Design Systems", date: "Jan 5", attendees: "956" },
  ]

  const activeUsers = [
    { name: "alex_dev", status: "online", reputation: "12.5k" },
    { name: "sarah_codes", status: "online", reputation: "8.2k" },
    { name: "tech_guru", status: "away", reputation: "15.7k" },
    { name: "design_lover", status: "online", reputation: "6.9k" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Trending Topics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <div key={topic.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground w-4">{index + 1}</span>
                <div>
                  <div className="text-sm font-medium">{topic.name}</div>
                  <div className="text-xs text-muted-foreground">{topic.posts} posts</div>
                </div>
              </div>
              <Badge variant="secondary" className="text-xs text-green-600">
                {topic.trend}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingEvents.map((event) => (
            <div key={event.name} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">{event.name}</div>
                <div className="text-xs text-muted-foreground">{event.date}</div>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="w-3 h-3" />
                <span>{event.attendees} interested</span>
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
            View All Events
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="w-5 h-5" />
            Active Users
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {activeUsers.map((user) => (
            <div key={user.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${user.status === "online" ? "bg-green-500" : "bg-yellow-500"}`}
                />
                <div>
                  <div className="text-sm font-medium">u/{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.reputation} rep</div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
