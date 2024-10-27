import { create } from 'zustand';
import { persist } from 'zustand/middleware';
//user and sidebar state management
// Define the type for the user object
export interface User {
  id: string | null;
  displayName: string | null;
  email: string | null;
  role: string | null;
  isVerified: boolean | null;
  phone: string | null;
  address: string | null;
  department: string | null;
}

// Define the type for your store's state
interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  // isSidebarOpen: boolean; // State for sidebar
  // toggleSidebar: () => void; // Function to toggle sidebar
}

const useUserStore = create<UserState>()(
  persist(
    set => ({
      user: null, // Initial state is no user
      setUser: user => set({ user }),
      clearUser: () => set({ user: null }),
      // Sidebar state outside of persistence
      // isSidebarOpen: false, // Initial state for sidebar is closed
      // toggleSidebar: () =>
      //   set(state => ({ isSidebarOpen: !state.isSidebarOpen })),
    }),
    {
      name: 'user-storage', // Key for localStorage
      partialize: state => ({ user: state.user }), // Persist only the user state
    },
  ),
);

export default useUserStore;
