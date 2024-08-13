import { Link } from "react-router-dom";
import { useUser } from "../../contexts/user/useUser";
import { useTasks } from "../../contexts/task/useTasks";
import supabase from "../../utils/supabaseClient";

export default function Navbar() {
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
    <div className="bg-gray-900 text-white w-full h-[60px]">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link to="/">Менеджер задач</Link>
        </div>
        {!user ? (
          <ul className="flex space-x-4">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
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
}
