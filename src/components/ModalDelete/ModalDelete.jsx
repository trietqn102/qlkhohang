import PropTypes from "prop-types";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

function ModalDelete({ onDelete, disabled }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className="w-40 py-4 border bg-red-500 text-white font-bold rounded-lg text-lg cursor-pointer "
        type="button"
        disabled={disabled}
        onClick={() => setShowModal(true)}
      >
        Xóa
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Xóa thông tin</h3>
                  <button onClick={() => setShowModal(false)}>
                    <IoMdClose size={16} />
                  </button>
                </div>

                <div className="relative p-6 flex-auto">
                  Bạn có chắc muốn xóa dữ liệu này!
                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="border border-green-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Hủy
                  </button>
                  <button
                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      onDelete();
                      setShowModal(false);
                    }}
                  >
                    Xóa
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

ModalDelete.propTypes = {
  onDelete: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ModalDelete;
