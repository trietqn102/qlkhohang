import { useContext, useState } from "react";
import { AuthContext } from "~/context/AuthContext";

function Auth() {
  const [data, setData] = useState({});
  const { login, statusCode } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(data);
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="relative flex w-1/2 xl:w-1/4  flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
      >
        <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-cyan-600 to-cyan-400 bg-clip-border text-white shadow-lg shadow-cyan-500/40">
          <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
            Đăng nhập
          </h3>
        </div>
        <div className="flex flex-col gap-4 p-6">
          {statusCode && (
            <p className="flex text-white text-xl rounded-lg bg-red-400 py-4 px-10">
              {statusCode == 404
                ? "Tài khoản không tồn tại"
                : "Mật khẩu không chính xác"}
            </p>
          )}
          <div className="relative h-11 w-full min-w-[200px] my-10">
            <input
              required
              placeholder=""
              value={data.username || ""}
              onChange={(e) =>
                setData((pre) => ({ ...pre, username: e.target.value }))
              }
              className="peer h-20 w-full rounded-md border border-blue-gray-200  px-3 py-3 font-sans text-xl font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[16px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[16px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Tài khoản
            </label>
          </div>
          <div className="relative h-11 w-full min-w-[200px] my-10">
            <input
              required
              placeholder=""
              type="password"
              value={data.password || ""}
              onChange={(e) =>
                setData((pre) => ({ ...pre, password: e.target.value }))
              }
              className="peer h-20 w-full rounded-md border border-blue-gray-200 px-3 py-3 font-sans text-xl font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[16px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[16px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Mật khẩu
            </label>
          </div>
        </div>
        <div className="p-6">
          <button
            data-ripple-light="true"
            type="submit"
            className="block w-full text-[16px] py-10 select-none rounded-lg bg-gradient-to-tr from-cyan-600 to-cyan-400 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-cyan-500/20 transition-all hover:shadow-lg hover:shadow-cyan-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Đăng nhập
          </button>
        </div>
      </form>
    </div>
  );
}

export default Auth;
