"use client"

import type React from "react"

// Stub file to satisfy deployment requirements
import { createContext, useContext } from "react"

const SettingsContext = createContext({})

export const useSettings = () => useContext(SettingsContext)

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  return <SettingsContext.Provider value={{}}>{children}</SettingsContext.Provider>
}
