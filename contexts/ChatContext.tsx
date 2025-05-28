"use client"

import type React from "react"

// Stub file to satisfy deployment requirements
import { createContext, useContext } from "react"

const ChatContext = createContext({})

export const useChat = () => useContext(ChatContext)

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  return <ChatContext.Provider value={{}}>{children}</ChatContext.Provider>
}
