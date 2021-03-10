import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

const QUERY_ACCOUNTS = gql`
  query QUERY_ACCOUNTS($email: String) {
    user: findAccountByEmail(email: $email) {
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
  label?: string;
};
type UserType = {
  email?: string;
  image?: string;
};

function findInitialsFromEmail(email: string): string {
  let name = email.split("@");
  if (name.length && name.length === 2) {
    let firstLast = name[0].split(".");
    if (firstLast.length && firstLast.length === 2) {
      const result = `${firstLast[0][0]}${firstLast[1][0]}`.toUpperCase();
      return result;
    }
  }
  return email.slice(0, 2).toUpperCase();
}

const CreatorInfo = ({ creator, created, image = "", label = "created on" }: CreatorInfoProps) => {
  const [src, setSrc] = useState("");

  const { data, loading } = useQuery<IAccountData>(QUERY_ACCOUNTS, { variables: { email: creator } });

  useEffect(() => {
    if (data) {
      const found = data.user;
      if (found && found.image) {
        setSrc(found.image);
      } else {
      }
    }
  }, [data]);

  if (loading) return <div />;
  return (
    <div className="mt-2 flex items-center">
      <div className="flex-shrink-0">
        <div>
          <span className="sr-only">Creator or user</span>
          {src ? (
            <img className="h-10 w-10 rounded-full" src={src} alt="" />
          ) : (
            <div className="rounded-full w-10 h-10 bg-teal-300 text-teal-800 flex items-center justify-center text-xl font-bold">
              {findInitialsFromEmail(creator)}
            </div>
          )}
        </div>
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900">
          <span className="hover:underline">{creator}</span>
        </p>
        <div className="flex space-x-1 text-xs text-gray-500 ml-3">
          <span className="font-semibold tracking-wide">{label}</span>
          <span>{created}</span>
        </div>
      </div>
    </div>
  );
};

export default CreatorInfo;
