import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { IoMdClose } from "react-icons/io";
import AuthContext from "~/context/AuthContext";
import * as authService from "~/service/authService";

function ModalEdit({ showModal, onClose }) {
  const { logOut } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [err, setErr] = useState("");

  const handleData = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  const onEdit = () => {
    if (data.password !== data.rePassword) {
      setErr("Mật khẩu không trùng khớp");
    } else {
      authService
        .editUser({ data })
        .then(() => {
          alert("Thay đổi mật khẩu thành công.Vui lòng đăng nhập lại!");
          logOut();
        })
        .catch((err) => console.log(err));
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
                  <h3 className="text-3xl font-semibold">Sửa thông tin</h3>
                  <button onClick={() => onClose()}>
                    <IoMdClose size={16} />
                  </button>
                </div>

                <div className="relative p-6 flex-auto">
                  {err && (
                    <p className="flex justify-center py-4 bg-red-600 mb-4 rounded-xl">
                      {err}
                    </p>
                  )}
                  <form className="flex flex-col  w-full">
                    <label htmlFor="password">Mật khẩu</label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Mật khẩu ..."
                      value={data.password || ""}
                      name="password"
                      onChange={(e) => handleData(e)}
                      className="border py-6 px-6 text-xl rounded-lg my-4"
                      required
                    />

                    <label htmlFor="re-password">Nhập lại mật khẩu</label>
                    <input
                      id="re-password"
                      type="password"
                      placeholder="Nhập lại mật khẩu ..."
                      value={data.rePassword || ""}
                      name="rePassword"
                      onChange={(e) => handleData(e)}
                      className="border py-6 px-6 text-xl rounded-lg my-4"
                      required
                    />
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
                      onEdit(data);
                    }}
                  >
                    Thay đổi
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

ModalEdit.propTypes = {
  onClose: PropTypes.func,
  showModal: PropTypes.bool,
};

export default ModalEdit;
