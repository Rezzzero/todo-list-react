import { useRecover } from "../model/useRecover";

export const RecoverForm = () => {
  const { email, recoverStatus, handleEmailChange, handleSubmit } =
    useRecover();
  return (
    <>
      <h1 className="text-3xl">Восстановление пароля</h1>
      <div className="w-[500px]">
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          required
          className="w-full bg-gray-500 text-white p-2 border border-gray-300 rounded-md mb-2"
        />
        {recoverStatus ? (
          <p className="text-green-500">Письмо отправлено</p>
        ) : null}
        <button
          className="bg-[#5864A3] h-10 w-[240px] text-lg rounded-md"
          onClick={handleSubmit}
        >
          Отправить
        </button>
      </div>
    </>
  );
};
