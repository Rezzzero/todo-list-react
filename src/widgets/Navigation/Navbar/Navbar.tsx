import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../../entities/user/model/useUser";
import { useTasks } from "../../../entities/task/model/useTasks";
import supabase from "../../../shared/api/supabaseClient";
import EditIcon from "@mui/icons-material/Edit";
import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { ChangeAvatarComponent } from "../../../features/UserManagement/ChangeAvatarComponent";
import { getAvatarUrl } from "../../../shared/utils/utils";

export const Navbar = () => {
  const { user } = useUser();
  const { clearTasksList } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const photoFromMetadata = user?.user_metadata.avatar_url;
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const url = getAvatarUrl(user.id);
      if (url) {
        fetch(url, { method: "HEAD" })
          .then((response) => {
            if (response.ok) {
              setAvatarUrl(url);
            } else {
              setAvatarUrl(photoFromMetadata || "https://placehold.co/200x200");
            }
          })
          .catch(() => {
            setAvatarUrl(photoFromMetadata || "https://placehold.co/200x200");
          });
      } else {
        setAvatarUrl(photoFromMetadata || "https://placehold.co/200x200");
      }
    }
  }, [user, photoFromMetadata]);

  const updateAvatar = () => {
    if (user) {
      const url = getAvatarUrl(user.id);
      if (url) {
        fetch(url, { method: "HEAD" })
          .then((response) => {
            if (response.ok) {
              setAvatarUrl(url);
            } else {
              setAvatarUrl(photoFromMetadata || "https://placehold.co/200x200");
            }
          })
          .catch(() => {
            setAvatarUrl(photoFromMetadata || "https://placehold.co/200x200");
          });
      } else {
        setAvatarUrl(photoFromMetadata || "https://placehold.co/200x200");
      }
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    navigate("/");
    if (error) {
      console.log(error);
    } else {
      clearTasksList();
    }
  };

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <div className="bg-[#D9D9D9] w-full h-[60px] ">
      <div className="container mx-auto px-4 flex justify-between items-center h-full">
        <Link to="/" className="flex items-center text-[#AB6060] font-island">
          <h1 className="text-5xl mr-2">R</h1>
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
          <div className="flex items-center space-x-4">
            <div className="relative group w-10 h-10">
              <img
                src={
                  avatarUrl
                    ? avatarUrl
                    : photoFromMetadata
                    ? photoFromMetadata
                    : "https://placehold.co/200x200"
                }
                alt="avatar"
                className="w-full h-full rounded-full object-cover group-hover:brithness-50 transition duration-300"
              />
              <EditIcon
                onClick={() => handleOpen()}
                data-testid="avatar-edit-icon"
                className="absolute inset-0 opacity-0 m-auto text-white group-hover:opacity-100 transition duration-300"
                fontSize="small"
              />
            </div>
            <p>
              {user.user_metadata.username
                ? user.user_metadata.username
                : user.user_metadata.full_name}
            </p>
            <button onClick={() => signOut()} className="text-red-500">
              Logout
            </button>
            {isModalOpen && (
              <Modal
                open={isModalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <div className="absolute top-[50%] left-[50%] text-center text-white translate-x-[-50%] translate-y-[-50%] w-[600px] h-[520px] p-4 bg-[#3D3D43]">
                  <ChangeAvatarComponent
                    onUpload={updateAvatar}
                    onClose={handleClose}
                  />
                </div>
              </Modal>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
