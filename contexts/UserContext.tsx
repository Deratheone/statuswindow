"use client"

import type React from "react"

// Stub file to satisfy deployment requirements
import { createContext, useContext } from "react"

const UserContext = createContext({})

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>
}
