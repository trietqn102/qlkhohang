import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

function ModalEdit({ showModal, onEdit, onClose, data }) {
  const [dataEdit, setDataEdit] = useState([]);

  useEffect(() => {
    setDataEdit(data);
  }, [data]);

  const handleData = (e) => {
    const newData = { ...dataEdit };
    newData[e.target.name] = e.target.value;
    setDataEdit(newData);
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
                  <form className="flex flex-col  w-full">
                    <label>Mã hàng</label>
                    <input
                      type="text"
                      placeholder="Mã hàng ..."
                      value={dataEdit.productCode || ""}
                      name="productCode"
                      onChange={(e) => handleData(e)}
                      className="border py-6 px-6 text-xl rounded-lg my-4"
                      disabled
                    />

                    <label htmlFor="weight">Khối lượng</label>
                    <input
                      type="number"
                      id="weight"
                      min={0}
                      value={dataEdit.weight}
                      name="weight"
                      onChange={(e) => handleData(e)}
                      placeholder="Khối lượng ..."
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
                      setDataEdit(data);
                    }}
                  >
                    Hủy
                  </button>
                  <button
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      onEdit(dataEdit);
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
  onEdit: PropTypes.func,
  onClose: PropTypes.func,
  data: PropTypes.object,
  showModal: PropTypes.bool,
};

export default ModalEdit;
