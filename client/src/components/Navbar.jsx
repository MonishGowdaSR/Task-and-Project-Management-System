import { Menu } from "lucide-react";

import { useAuth } from "../context/AuthContext";

const Navbar = ({
  setSidebarOpen,
}) => {

  const { userInfo } = useAuth();

  return (

    <div className="bg-white shadow p-4 flex justify-between items-center">

      <div className="flex items-center gap-4">

        <button
          className="lg:hidden"
          onClick={() =>
            setSidebarOpen(true)
          }
        >

          <Menu size={28} />

        </button>

        <h2 className="text-2xl font-bold">
          Dashboard
        </h2>

      </div>

      <div className="font-semibold">
        Welcome, {userInfo?.name}
      </div>

    </div>
  );
};

export default Navbar;