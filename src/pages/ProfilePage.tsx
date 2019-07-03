import React from 'react';
import { useMutation } from 'react-apollo-hooks';
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
  const mutation = useMutation(UPDATE_PROFILE_PIC_MUTATION);
  const [image, setImage] = React.useState(user.image);
  React.useEffect(() => {
    const result = mutation({
      variables: { where: { email, fullname }, image }
    });
  }, [image]);

  React.useEffect(() => {
    userCtx.setProfilePic(image);
  }, [image]);
  return (
    <div>
      <h2>Update your profile picture</h2>
      <div>
        <img src={image} style={{ height: '100px' }} />
      </div>

      <FileUploader
        link={`\\\\nlbavwixs.infor.com\\images\\profilepics\\${email}`}
        httpLinkPrefix={`http://nlbavwixs.infor.com/images/profilepics/${email}/`}
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
