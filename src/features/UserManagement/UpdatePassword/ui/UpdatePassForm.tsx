import { useUpdatePass } from "../model/useUpdatePass";

export const UpdatePassForm = () => {
  const { newPassword, status, handleChangePassword, handleSubmit } =
    useUpdatePass();
  return (
    <>
      <h1 className="text-3xl">Введите почту и новый пароль</h1>
      <div className="flex flex-col items-center gap-3 w-[500px]">
        <input
          type="password"
          name="password"
          value={newPassword}
          onChange={handleChangePassword}
          placeholder="New password"
          required
          className="w-full bg-gray-500 text-white p-2 border border-gray-300 rounded-md mb-2"
        />
        {status ? <p className="text-green-500">Пароль обновлен</p> : null}
        <button
          onClick={handleSubmit}
          className="bg-[#5864A3] h-10 w-[240px] text-lg rounded-md"
        >
          Обновить
        </button>
      </div>
    </>
  );
};
