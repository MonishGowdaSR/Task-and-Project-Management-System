import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { userInfo } = useAuth();

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">

      <h2 className="text-2xl font-bold">
        Dashboard
      </h2>

      <div className="font-semibold">
        Welcome, {userInfo?.name}
      </div>

    </div>
  );
};

export default Navbar;