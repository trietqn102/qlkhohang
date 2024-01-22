import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import * as StoredService from "~/service/storedService";
import * as doaService from "~/service/doaService";

function ModalImport({ showModal, onClose, fetchToken }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const options = Array.from({ length: 11 }, (_, index) => ({
    value: index + 1,
    label: String(index + 1),
  }));

  const handleData = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    if (!currentToken) {
      navigate("/login");
    } else {
      const decode = jwtDecode(currentToken);
      if (decode.role !== 0) {
        navigate("/");
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const DOA = parseInt(data.location) * 30 + 15;
    const time = new Date().toLocaleDateString("vn-vi");

    doaService
      .postDoa({ doa: DOA, time: time })

    StoredService.postStored({ data })
      .then((items) => {
        if (items.data?.keyPattern?.productCode > 0) {
          alert("Mã sản phẩm đã tồn tại!");
        } else {
          fetchToken();
          onClose()
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-5xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Nhập hàng</h3>
                  <button onClick={() => onClose()}>
                    <IoMdClose size={16} />
                  </button>
                </div>

                <div className="relative px-6 py-10 flex-auto ">
                  <div className="flex justify-center">
                    <form className="w-full" onSubmit={handleSubmit}>
                      <input
                        type="text"
                        placeholder="Mã hàng ..."
                        value={data.productCode || ""}
                        name="productCode"
                        onChange={(e) => handleData(e)}
                        className="border py-6 px-6 text-xl rounded-lg my-4 ml-2 mr-3 w-[calc(50%-14px)]"
                        required
                      />

                      <input
                        type="number"
                        id="myInput"
                        min={0}
                        value={data.weight || ""}
                        name="weight"
                        onChange={(e) => handleData(e)}
                        placeholder="Khối lượng ..."
                        className="border py-6 px-6 text-xl rounded-lg  w-1/2"
                        required
                      />

                      <input
                        type="text"
                        placeholder="Tên sản phẩm ..."
                        value={data.name || ""}
                        name="name"
                        onChange={(e) => handleData(e)}
                        className="border py-6 px-6 text-xl rounded-lg my-4 mx-2 w-full"
                        required
                      />

                      <select
                        className="border py-6 px-6 text-xl rounded-lg my-4 mx-2 w-full"
                        value={data.location || ""}
                        name="location"
                        onChange={(e) => handleData(e)}
                        required
                      >
                        <option value="">Chọn vị trí ...</option>
                        {options.map((item) => (
                          <option key={item.label} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </select>

                      <div className="flex">
                        <button
                          type="submit"
                          className="border w-1/2 border-green-500 hover:bg-green-500 font-bold uppercase text-sm px-6 py-5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        >
                          Nhập hàng
                        </button>
                        <button
                          className="border w-1/2 border-red-500 font-bold uppercase text-sm px-6 py-5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => {
                            onClose();
                          }}
                        >
                          Hủy
                        </button>
                      </div>
                    </form>
                  </div>
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

ModalImport.propTypes = {
  onClose: PropTypes.func,
  showModal: PropTypes.bool,
  fetchToken: PropTypes.func,
};

export default ModalImport;
