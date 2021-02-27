import { gql, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";

const QUERY_ACCOUNTS = gql`
  query QUERY_ACCOUNTS {
    user: findAccountByEmail {
      email
      image
    }
  }
`;

interface IAccount {
  email: string;
  image: string;
}
interface IAccountData {
  user: IAccount;
}
type CreatorInfoProps = {
  creator: string;
  created: string;
  image?: string;
};
type UserType = {
  email?: string;
  image?: string;
};
const CreatorInfo = ({ creator, created, image = "" }: CreatorInfoProps) => {
  const [src, setSrc] = useState(
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixqx=uZDt5cC8cT&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  );

  const { data, loading } = useQuery<IAccountData>(QUERY_ACCOUNTS);

  useEffect(() => {
    if (data) {
      const found = data.user;
      if (found && found.image) {
        setSrc(found.image);
      }
    }
  }, [data]);

  if (loading) return <div />;
  return (
    <div className="mt-6 flex items-center">
      <div className="flex-shrink-0">
        <div>
          <span className="sr-only">Daniela Metz</span>
          <img className="h-10 w-10 rounded-full" src={src} alt="" />
        </div>
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900">
          <span className="hover:underline">{creator}</span>
        </p>
        <div className="flex space-x-1 text-sm text-gray-500">
          <span>{created}</span>
        </div>
      </div>
    </div>
  );
};

export default CreatorInfo;
