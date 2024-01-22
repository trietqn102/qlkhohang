import PropTypes from "prop-types";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

function ModalAddUser({ showModal, onAdd, onClose }) {
  const [data, setData] = useState([]);

  const handleData = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  const handleSubmit = () => {
    if (data.password !== data.rePassword) {
      alert("Mật khẩu không trùng khớp");
    } else {
      onAdd(data);
    }
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Thêm người dùng</h3>
                  <button onClick={() => onClose()}>
                    <IoMdClose size={16} />
                  </button>
                </div>

                <div className="relative p-6 flex-auto ">
                  <form className="flex flex-col  w-full ">
                    <label htmlFor="username" className="text-xl">
                      Tài khoản
                    </label>
                    <input
                      id="username"
                      type="text"
                      placeholder="Tài khoản ..."
                      value={data.username || ""}
                      name="username"
                      onChange={(e) => handleData(e)}
                      className="border py-6 px-6 text-2xl rounded-lg my-4"
                    />

                    <label htmlFor="email" className="text-xl">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Email ..."
                      value={data.email || ""}
                      name="email"
                      onChange={(e) => handleData(e)}
                      className="border py-6 px-6 text-2xl rounded-lg my-4"
                    />

                    <label htmlFor="name" className="text-xl">
                      Họ tên
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Họ tên ..."
                      value={data.name || ""}
                      name="name"
                      onChange={(e) => handleData(e)}
                      className="border py-6 px-6 text-2xl rounded-lg my-4"
                    />

                    <label htmlFor="password" className="text-xl">
                      Mật khẩu
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Mật khẩu ..."
                      value={data.password || ""}
                      name="password"
                      onChange={(e) => handleData(e)}
                      className="border py-6 px-6 text-2xl rounded-lg my-4"
                      required
                    />
                    <label htmlFor="re-password" className="text-xl">
                      Nhập lại mật khẩu
                    </label>
                    <input
                      id="re-password"
                      type="password"
                      placeholder="Nhập lại mật khẩu ..."
                      value={data.rePassword || ""}
                      name="rePassword"
                      onChange={(e) => handleData(e)}
                      className="border py-6 px-6 text-2xl rounded-lg my-4"
                      required
                    />

                    <select
                      value={data.role || "1"}
                      name="role"
                      onChange={(e) => handleData(e)}
                      className="border py-6 px-6 text-xl rounded-lg my-4"
                    >
                      <option value="0" className="text-2xl">
                        Người quản lý
                      </option>
                      <option value="1" className="text-2xl">
                        Người dùng
                      </option>
                    </select>
                  </form>
                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="border border-green-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      onClose();
                    }}
                  >
                    Hủy
                  </button>
                  <button
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Thêm
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

ModalAddUser.propTypes = {
  errAdd: PropTypes.string,
  onAdd: PropTypes.func,
  onClose: PropTypes.func,
  showModal: PropTypes.bool,
};

export default ModalAddUser;
