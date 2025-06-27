import type React from "react"
import Link from "next/link"
import {
  BarChart3,
  BookOpen,
  Code,
  GitFork,
  FolderClosedIcon as IssueClosed,
  LayoutDashboard,
  Settings,
} from "lucide-react"

interface RepoHeaderProps {
  owner: string
  name: string
}

const RepoHeader: React.FC<RepoHeaderProps> = ({ owner, name }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
      <h1 className="text-2xl font-semibold">{name}</h1>
      <p className="text-gray-600">
        {owner} / {name}
      </p>

      <nav className="mt-4">
        <ul className="flex space-x-4">
          <li>
            <Link href={`/repo/${owner}/${name}`} className="flex items-center space-x-2 hover:text-blue-500">
              <LayoutDashboard size={16} />
              <span>Overview</span>
            </Link>
          </li>
          <li>
            <Link href={`/repo/${owner}/${name}/code`} className="flex items-center space-x-2 hover:text-blue-500">
              <Code size={16} />
              <span>Code</span>
            </Link>
          </li>
          <li>
            <Link href={`/repo/${owner}/${name}/issues`} className="flex items-center space-x-2 hover:text-blue-500">
              <IssueClosed size={16} />
              <span>Issues</span>
            </Link>
          </li>
          <li>
            <Link href={`/repo/${owner}/${name}/pulls`} className="flex items-center space-x-2 hover:text-blue-500">
              <GitFork size={16} />
              <span>Pull requests</span>
            </Link>
          </li>
          <li>
            <Link href={`/repo/${owner}/${name}/wiki`} className="flex items-center space-x-2 hover:text-blue-500">
              <BookOpen size={16} />
              <span>Wiki</span>
            </Link>
          </li>
          <li>
            <Link href={`/repo/${owner}/${name}/insights`} className="flex items-center space-x-2 hover:text-blue-500">
              <BarChart3 size={16} />
              <span>Insights</span>
            </Link>
          </li>
          <li>
            <Link href={`/repo/${owner}/${name}/settings`} className="flex items-center space-x-2 hover:text-blue-500">
              <Settings size={16} />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export { RepoHeader }
