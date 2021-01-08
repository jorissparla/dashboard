import { addHours, format } from "date-fns";
import { useAlert } from "globalState/AlertContext";
import { useUserContext } from "globalState/UserProvider";
import React from "react";
import { useMutation } from "@apollo/client";
import FileUploader from "../common/FileUploaderNew";
import { UPDATE_PROFILE_PIC_MUTATION } from "../graphql/UPDATE_PROFILE_PIC";

const ProfilePage = ({ active = null }) => {
  const { user: current } = useUserContext();
  const alert = useAlert();

  let user = active || current;
  const { email, fullname } = user;
  console.log(user);
  const [updateProfilePicture] = useMutation(UPDATE_PROFILE_PIC_MUTATION);
  const [image, setImage] = React.useState(user.image);

  function handleSetFile(value) {
    // setFile(value);
    setImage(value);
    alert.setMessage("File was uploaded");
    updateProfilePicture({
      variables: { where: { email, fullname }, image: value },
    });
  }
  return (
    <div className="h-screen antialiased w-full bg-gray-200 p-10 mt-10">
      <div className="max-w-2xl mx-auto rounded shadow-lg py-5 flex px-2 flex-col justify-center bg-white flex-wrap overflow-hidden">
        <h2 className="text-gray-700 font-semibold text-center">Hi {fullname}!!</h2>
        <div className="w-full ">
          <img className=" w-full rounded object-cover " src={image.replace("http:", "https:")} alt="" />
        </div>
        <a href={image}>{image}</a>
        {current?.role === "Admin" ||
          (true && (
            <FileUploader
              link={`\\\\nlbavwixs.infor.com\\images\\profilepics\\${email}`}
              httpLinkPrefix={`https://nlbavwixs.infor.com/images/profilepics/${email}/`}
              readOnly={false}
              setFile={handleSetFile}
              title="Profile Picture"
            />
          ))}
        <div className="mt-4 flex">
          <div className="font-semibold flex items-start">
            Role:
            <span className="uppercase mx-2 text-teal-500">{user.role}</span>
          </div>
          <div className="font-semibold flex items-start">
            Email:
            <span className=" mx-2 text-teal-500">{email}</span>
          </div>
          <div className="font-semibold flex items-start">
            NavID:
            <span className=" mx-2 text-teal-500">{user.navid}</span>
          </div>
          <div className="font-semibold flex items-start">
            Team:
            <span className=" mx-2 text-teal-500">{user.team}</span>
          </div>
          <div className="font-semibold flex items-start">
            Region:
            <span className=" mx-2 text-teal-500">{user.region}</span>
          </div>
        </div>
        <div className="mt-2 flex w-full justify-end px-4 items-center">
          <div className="w-full flex items-center flex-wrap">
            {user.permissions.map(({ permission }, index) => (
              <span
                key={index}
                className="mx-1 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-indigo-100 text-indigo-800"
              >
                {permission}
              </span>
            ))}
          </div>
        </div>
        <div className="font-semibold flex items-start mt-4">
          Last Login:
          <span className=" mx-2 text-teal-500"> {format(addHours(parseInt(user.lastlogin), -2), "yyyy-MM-dd HH:mm")}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
