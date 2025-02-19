import MyAccountLayout from "@/components/my-account/MyAccountLayout";
import UserProfile from "@/components/my-account/UserProfile";

const MyAccountPage = () => {
  return (
    <MyAccountLayout>
      <div>
        <UserProfile />
      </div>
    </MyAccountLayout>
  );
};

export default MyAccountPage;
