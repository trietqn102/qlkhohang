import { MdError } from "react-icons/md";
import { Link } from "react-router-dom";
import routes from "~/config/routes";

function ClientEmpty() {
  return (
    <div className="w-full h-[80vh] text-2xl flex flex-col justify-center items-center">
      <MdError size={200} color="red" />
      <p className="text-4xl my-8 font-bold">Không đủ quyền hạn</p>
      <p className="text-3xl text-gray-400 hover:text-black hover:font-bold">
        Không phận sự miễn vào
      </p>
      <Link
        to={routes.home}
        className="py-4 px-10 mt-4 rounded-xl bg-blue-200 "
      >
        Về trang chủ
      </Link>
    </div>
  );
}

export default ClientEmpty;
