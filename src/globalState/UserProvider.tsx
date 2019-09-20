import React, { useEffect, useState } from 'react';
import { client } from '../index';
import { MUTATION_SIGNIN } from './../auth/signin';
import { MUTATION_SIGNOUT } from './../auth/signout';
import { CURRENT_USER_QUERY } from './../graphql/CURRENT_USER_QUERY';

interface User {
  id: string;
  fullname: string;
  email: string;
  image: string;
  role: string;
  team: string;
  permissions: { permission: string }[];
}

enum Empty {
  empty
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermissions: (user: User, roles: string[]) => boolean;
}
export const UserContext = React.createContext<UserContextType>({
  user: null,
  login: () => null,
  logout: () => null,
  isAuthenticated: false,
  hasPermissions: () => false
});

//test

export const UserContextProvider: React.FC<{ children: any }> = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    client.query({ query: CURRENT_USER_QUERY }).then(result => {
      console.log('Provider CDM', result);
      if (!result.data.me) {
        setUser(null);
      } else {
        setUser(result.data.me);
        console.log('LOgged In successfully, ', result.data.me);
      }
    });
  }, []);
  function isAuthenticated() {
    return user ? true : false;
  }
  function hasPermissions(user: User, roles: string[]): boolean {
    if (!user) return false;
    const permissions = user.permissions;
    if (!user.permissions) return false;
    const found = user.permissions.filter(u => roles.includes(u.permission));
    if (found.length > 0) {
      return true;
    } else return false;
  }
  async function login(email: string, password: string) {
    client
      .mutate({ mutation: MUTATION_SIGNIN, variables: { input: { email, password } } })
      .then(result => {
        console.log(result);
        if (result.data.signinUser.user) {
          setUser(result.data.signinUser.user);
        } else {
          setUser(null);
        }
        return result;
      });
  }
  async function logout() {
    client.mutate({ mutation: MUTATION_SIGNOUT }).then(result => {
      if (result) {
        setUser(null);
      }
    });
  }
  return (
    <UserContext.Provider
      value={{ user, login, logout, isAuthenticated: isAuthenticated(), hasPermissions }}
    >
      {children}
    </UserContext.Provider>
  );
};
