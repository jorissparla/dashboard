import React, { useEffect } from "react";
import { useHistory } from "react-router";

export const NotAuthorized = () => {
  const history = useHistory();
  useEffect(() => {
    const handle = setTimeout(() => {
      history.push("/");
    }, 3000);
    return () => {
      clearTimeout(handle);
    };
  }, []);
  return (
    <div>
      <p className="text-2xl text-center text-blue-800">Not Authorized</p>
      <div>redirecting....</div>
    </div>
  );
};
