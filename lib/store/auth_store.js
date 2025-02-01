import { create } from "zustand"

const useAuthStore = create((set) => ({
  username: null,
  setUsername: (username) => set({ username }),
  hydrate: (initialState) => set(initialState),
}))

export default useAuthStore

