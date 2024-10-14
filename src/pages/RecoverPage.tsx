import { RecoverForm } from "../features/UserManagement/RecoverPassword/ui/RecoverForm";

export const RecoverPage = () => {
  return (
    <div className="flex flex-col gap-4 container mx-auto h-[220px] justify-center items-center text-center bg-[#3D3D43] text-white p-4">
      <RecoverForm />
    </div>
  );
};
