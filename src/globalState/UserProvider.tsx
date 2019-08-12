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
  permissions: { permission: string }[];
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => any;
  logout: () => any;
  isAuthenticated: boolean;
}
export const UserContext = React.createContext<UserContextType>({
  user: null,
  login: () => null,
  logout: () => null,
  isAuthenticated: false
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
        console.log('LOgged In successfully');
      }
    });
  }, []);
  function isAuthenticated() {
    return user ? true : false;
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
    <UserContext.Provider value={{ user, login, logout, isAuthenticated: isAuthenticated() }}>
      {children}
    </UserContext.Provider>
  );
};
