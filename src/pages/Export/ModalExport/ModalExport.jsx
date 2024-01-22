import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";
import * as exportService from "~/service/exportService";
import * as storedService from "~/service/storedService";

function ModalExport({ showModal, onClose, fetchToken }) {
  const [dataExport, setDataExport] = useState([]);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetch = () => {
    storedService
      .getStoredImport({})
      .then((data) => {
        setData(data.data);
        setSearch(data.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleExport = () => {
    exportService
      .exportStored({ data: dataExport })
      .then((data) => {
        if (data.data) {
          fetchToken();
          fetch();
          setDataExport([]);
          onClose()
        }
      })
      .catch((error) => console.log(error));
  };

  const handleSelect = (e) => {
    const id = e.target.value;
    const isSelected = dataExport.some((item) => item.id === id);
    if (isSelected) {
      setDataExport((prevData) => prevData.filter((item) => item.id !== id));
    } else {
      setDataExport((prevData) => [...prevData, { id }]);
    }
  };

  const itemsPerPage = 15;

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filteredData = data.filter(
      (item) =>
        (item.name && item.name.toLowerCase().includes(value.toLowerCase())) ||
        (item.name &&
          item.productCode.toLowerCase().includes(value.toLowerCase()))
    );

    setSearch(filteredData);
  };

  const totalItems = search.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = search.slice(startIndex, endIndex);

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-7xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Xuất kho</h3>
                  <button onClick={() => onClose()}>
                    <IoMdClose size={16} />
                  </button>
                </div>

                <div className="relative p-6 flex-auto ">
                  <div className="w-full flex md:justify-end justify-center">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={handleSearch}
                      placeholder="Tìm kiếm bằng mã hoặc tên sản phẩm"
                      className="md:w-1/4 w-full border rounded-md px-3 py-2 mb-4 md:mx-0 mx-10"
                    />
                  </div>
                  <table className="w-full md:text-xl text-sm text-left rtl:text-right text-gray-500">
                    <thead className="md:text-xl text-xs text-gray-700 uppercase border">
                      <tr>
                        <th></th>
                        <th scope="col" className="px-6 py-3">
                          STT
                        </th>
                        <th scope="col" className="px-6 py-3 ">
                          Tên hàng
                        </th>
                        <th scope="col" className="px-6 py-3 ">
                          Mã sản phẩm
                        </th>
                        <th scope="col" className="px-6 py-3 ">
                          Khối lượng
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.length > 0 ? (
                        currentData.map((item, index) => (
                          <tr key={item._id} className="bg-white border-b">
                            <th className="px-6 py-4">
                              <input
                                type="checkbox"
                                value={item._id}
                                onChange={(e) => handleSelect(e)}
                                checked={dataExport.some(
                                  (data) => data.id === item._id
                                )}
                              />
                            </th>
                            <th className="px-6 py-4">{index + 1}</th>
                            <td className="px-6 py-4">{item.name}</td>
                            <td className="px-6 py-4">{item.productCode}</td>
                            <td className="px-6 py-4">{item.weight}KG</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={9} className="text-center">
                            Không có dữ liệu
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <div className="flex justify-end mt-4">
                    {currentPage !== 1 && (
                      <button
                        onClick={() =>
                          setCurrentPage((prevPage) =>
                            Math.max(prevPage - 1, 1)
                          )
                        }
                      >
                        <IoIosArrowBack />
                      </button>
                    )}
                    <span className="mx-2 border-neutral-400">
                      Trang {currentPage} trên {totalPages}
                    </span>
                    {currentPage !== totalPages && (
                      <button
                        onClick={() =>
                          setCurrentPage((prevPage) =>
                            Math.min(prevPage + 1, totalPages)
                          )
                        }
                      >
                        <IoIosArrowForward />
                      </button>
                    )}
                  </div>
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
                      handleExport();
                    }}
                  >
                    Xuất
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

ModalExport.propTypes = {
  onClose: PropTypes.func,
  showModal: PropTypes.bool,
  fetchToken: PropTypes.func,
};

export default ModalExport;
