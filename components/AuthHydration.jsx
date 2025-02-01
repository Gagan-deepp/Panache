"use client"

import useAuthStore from "@/lib/store/auth_store"
import { useEffect } from "react"

export default function AuthHydration({ initialUsername }) {
  const hydrate = useAuthStore((state) => state.hydrate)

  useEffect(() => {
    hydrate({ username: initialUsername })
  }, [hydrate, initialUsername])

  return null
}

