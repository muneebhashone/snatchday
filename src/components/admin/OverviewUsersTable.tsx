import React from 'react'
import { AvatarImage } from '../ui/avatar'
import { Avatar } from '../ui/avatar'
import { CardContent } from '../ui/card'
import { Card } from '../ui/card'
import { AvatarFallback } from '../ui/avatar'
import { Badge } from '../ui/badge'

const OverviewUsersTable = () => {
    const users = [
        {
          name: "Jordan Stevenson",
          username: "@amiccoo",
          email: "susanna.Lind57@gmail.com",
          role: "Admin",
          status: "Pending",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          name: "Benedetto Rossiter",
          username: "@brossiter15",
          email: "estelle.Bailey10@gmail.com",
          role: "Editor",
          status: "Active",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          name: "Bentlee Emblin",
          username: "@bemblinf",
          email: "milo86@hotmail.com",
          role: "Author",
          status: "Active",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          name: "Bertha Biner",
          username: "@bbinerh",
          email: "lonnie35@hotmail.com",
          role: "Editor",
          status: "Pending",
          avatar: "",
        },
        {
          name: "Beverlie Krabbe",
          username: "@bkrabbe1d",
          email: "ahmad_Collins@yahoo.com",
          role: "Maintainer",
          status: "Inactive",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          name: "Bradan Rosebotham",
          username: "@brosebothamz",
          email: "tillman.Gleason68@hotmail.com",
          role: "Editor",
          status: "Pending",
          avatar: "",
        },
        {
          name: "Bree Kilday",
          username: "@bkildayr",
          email: "otho21@gmail.com",
          role: "Subscriber",
          status: "Active",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ]
  return (
    <Card className=''>
    <CardContent className="p-0">
      <div className="overflow-x-auto overflow-y-auto h-[500px]">
        <table className="">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4 font-medium text-sm">USER</th>
              <th className="text-left p-4 font-medium text-sm">EMAIL</th>
              <th className="text-left p-4 font-medium text-sm">ROLE</th>
              <th className="text-left p-4 font-medium text-sm">STATUS</th>
            </tr>
          </thead>
          <tbody className=''>
            {users.map((user, i) => (
              <tr key={i} className="border-b last:border-0">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    {user.avatar ? (
                      <Avatar>
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <Avatar>
                        <AvatarFallback
                          className={`bg-${["pink", "blue", "green", "purple", "yellow", "red"][i % 6]}-100`}
                        >
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.username}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm">{user.email}</td>
                <td className="p-4">
                  <div className="flex items-center">
                    {user.role === "Admin" && <span className="text-indigo-500 mr-2">👑</span>}
                    {user.role === "Editor" && <span className="text-yellow-500 mr-2">✏️</span>}
                    {user.role === "Author" && <span className="text-red-500 mr-2">📝</span>}
                    {user.role === "Maintainer" && <span className="text-blue-500 mr-2">🔧</span>}
                    {user.role === "Subscriber" && <span className="text-green-500 mr-2">👤</span>}
                    {user.role}
                  </div>
                </td>
                <td className="p-4">
                  <Badge
                    className={`
                      ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : user.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                      }
                    `}
                  >
                    {user.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
  )
}

export default OverviewUsersTable