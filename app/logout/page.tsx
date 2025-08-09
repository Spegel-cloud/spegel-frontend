'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Logout() {
  const router = useRouter()

  useEffect(() => {
    // Fjern JWT-tokenet
    localStorage.removeItem('jwt')

    // Redirect til forsiden etter utlogging
    router.push('/')
  }, [])

  return <p>Logger ut...</p>
}
