import { create }  from 'zustand';

interface TokenState {
    token: string | null;
    setToken: (newToken: string) => void;
    clearToken: () => void;
  }

  const useTokenStore = create<TokenState>((set) => ({
    token: null,
    setToken: (newToken) => set({ token: newToken }),
    clearToken: () => set({ token: null }),
  }));

  export default useTokenStore;