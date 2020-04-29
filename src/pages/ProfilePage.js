import React from "react";
import { useMutation } from "react-apollo";
import FileUploader from "../common/FileUploaderNew";
import { UPDATE_PROFILE_PIC_MUTATION } from "../graphql/UPDATE_PROFILE_PIC";
import { DashBoardContext } from "../globalState/Provider";
import { useUserContext } from "globalState/UserProvider";
import { useAlert } from "globalState/AlertContext";

const ProfilePage = ({}) => {
  const { user, setProfilePic } = useUserContext();
  const alert = useAlert();
  // const [file, setFile] = usePersistentState("");
  console.log(user);
  // if (!user) {
  //   return <h1>Not logged in </h1>;
  // }
  const email = user.email;
  const fullname = user.fullname;
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
        <h2 className="text-gray-700 font-semibold">Hi {fullname}, Update your profile picture</h2>
        <div className="w-full ">
          <img className=" w-full rounded object-cover " src={image.replace("http:", "https:")} alt="" />
        </div>
        <a href={image}>{image}</a>
        <FileUploader
          link={`\\\\nlbavwixs.infor.com\\images\\profilepics\\${email}`}
          httpLinkPrefix={`https://nlbavwixs.infor.com/images/profilepics/${email}/`}
          readOnly={false}
          setFile={handleSetFile}
        />
        <div className="mt-4 flex">
          <div className="font-semibold flex items-start">
            Role:
            <span className="uppercase mx-2 text-teal-500">{user.role}</span>
          </div>
          <div className="font-semibold flex items-start">
            Email:
            <span className="uppercase mx-2 text-teal-500">{email}</span>
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
      </div>
    </div>
  );
};

export default ProfilePage;
