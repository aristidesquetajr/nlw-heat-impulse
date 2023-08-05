import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../services/api";

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextData)

type AuthProvider = {
  children: ReactNode;
}

type AuthResponse = {
  token: string;
  user: User;
}

export function AuthProvider(props: AuthProvider) {

  const [user, setUser] = useState<User | null>(null)

  const client_id = "f6d2d1712e5c318be01e";

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}`;

  async function signIn(code: string) {
    const response = await api.post<AuthResponse>('authenticate', {
      code
    });

    const { token, user } = response.data;

    localStorage.setItem('@dowhile:token', token);

    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    setUser(user);
  }

  function signOut() {
    setUser(null)
    localStorage.removeItem('@dowhile:token')
  }

  useEffect(() => {
    const token = localStorage.getItem('@dowhile:token');

    if(token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      api.get<User>('profile').then(response => {
        setUser(response.data)
      })
    }
  }, [])

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=')

    if(hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=')

      window.history.pushState({}, '', urlWithoutCode)

      signIn(githubCode)
    }
  },[])

  return (
    <AuthContext.Provider value={{ user, signInUrl, signOut  }}>
      {props.children}
    </AuthContext.Provider>
  )
}

