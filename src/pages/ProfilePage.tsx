import React from 'react';
import { useMutation } from 'react-apollo';
import FileUploader from '../common/FileUploaderNew';
import { UPDATE_PROFILE_PIC_MUTATION } from '../graphql/UPDATE_PROFILE_PIC';
import { DashBoardContext } from '../globalState/Provider';

interface ProfilePageProps {
  user: { fullname: string; email: string; image: string };
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  let userCtx: any;
  userCtx = React.useContext(DashBoardContext);
  console.log(userCtx);
  // if (!user) {
  //   return <h1>Not logged in </h1>;
  // }
  const email = user.email;
  const fullname = user.fullname;
  const [updateProfilePicture] = useMutation(UPDATE_PROFILE_PIC_MUTATION);
  const [image, setImage] = React.useState(user.image);
  React.useEffect(() => {
    updateProfilePicture({
      variables: { where: { email, fullname }, image }
    });
  }, [image, email, fullname, updateProfilePicture]);

  React.useEffect(() => {
    userCtx.setProfilePic(image);
  }, [image, userCtx]);
  return (
    <div>
      <h2>Update your profile picture</h2>
      <div>
        <img src={image.replace('http:', 'https:')} style={{ height: '100px' }} />
      </div>

      <FileUploader
        link={`\\\\nlbavwixs.infor.com\\images\\profilepics\\${email}`}
        httpLinkPrefix={`https://nlbavwixs.infor.com/images/profilepics/${email}/`}
        readOnly={false}
        setFile={async (value: string) => {
          console.log('Profile:::', value);
          setImage(value);
        }}
      />
    </div>
  );
};

export default ProfilePage;
