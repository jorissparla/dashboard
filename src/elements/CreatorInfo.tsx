import React from "react";

type CreatorInfoProps = {
  creator: string;
  created: string;
  image?: string;
};

const CreatorInfo: React.FC<CreatorInfoProps> = ({ creator, created, image = "" }) => {
  let src = image
    ? image
    : "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixqx=uZDt5cC8cT&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
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
