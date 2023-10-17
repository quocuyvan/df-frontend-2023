'use client'

import { useRouter } from 'next/navigation'
import { getSession } from 'src/services/auth'
import Header from './Header'

interface Props {
  children: React.ReactNode
}

interface Props {}

const Layout: React.FC<Props> = ({ children }): JSX.Element => {
  const router = useRouter()

  const accessToken: string | null = getSession()

  if (!accessToken) {
    router.push('/login')
    return <div>authenticating...</div>
  }

  return (
    <div className="bg-white dark:bg-gray-800 w-screen h-screen text-gray-900 dark:text-gray-300 p-5">
      <Header />
      {children}
    </div>
  )
}

export default Layout
