import { Link } from "react-router-dom";
import { useUser } from "../../contexts/user/useUser";
import { useTasks } from "../../contexts/task/useTasks";
import supabase from "../../utils/supabaseClient";

export const Navbar = () => {
  const { user } = useUser();
  const { clearTasksList } = useTasks();
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      clearTasksList();
    }
  };

  return (
    <div className="bg-[#D9D9D9] w-full h-[60px] ">
      <div className="container mx-auto px-4 flex justify-between items-center h-full">
        <Link to="/" className="flex align-center text-[#AB6060] font-island">
          <h1 className="text-3xl mr-2">R</h1>
          <p className="pt-1 text-black text-xl font-light font-roboto">
            TaskManager
          </p>
        </Link>
        {!user ? (
          <ul className="flex space-x-4">
            <li>
              <Link to="/login">Log In</Link>
            </li>
            <li>
              <Link to="/register">Sign Up</Link>
            </li>
          </ul>
        ) : (
          <div className="flex space-x-4">
            <p>{user.user_metadata.username}</p>
            <button onClick={() => signOut()} className="text-red-500">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
