import { UpdatePassForm } from "../features/UserManagement/UpdatePassword/ui/UpdatePassForm";

export const UpdatePasswordPage = () => {
  return (
    <div className="flex flex-col gap-4 container mx-auto h-[250px] justify-center items-center text-center bg-[#3D3D43] text-white p-4">
      <UpdatePassForm />
    </div>
  );
};
