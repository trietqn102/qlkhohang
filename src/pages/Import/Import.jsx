import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import * as storedService from "~/service/storedService";
import ModalImport from "./ModalImport";
import NotificationModal from "./NotificationModal/NotificationModal";

function Import() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const fetchToken = async () => {
    const currentToken = localStorage.getItem("token");
    if (!currentToken) {
      navigate("/login");
    } else {
      try {
        const decode = jwtDecode(currentToken);
        if (decode.role === 0) {
          storedService
            .getAll({})
            .then((data) => {
              setData(data.data);
              setSearch(data.data);
            })
            .catch((error) => console.log(error));
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error decoding JWT:", error);
      }
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  const onClose = () => {
    setShowModal(false);
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

  const [lightOn, setLightOn] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);


  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://us-east-1.aws.data.mongodb-api.com/app/application-0-sznak/endpoint/status');
      const status = response.data[0].status;
      setLightOn(status === 1);
    } catch (error) {
      console.error('Error fetching light status:', error);
    }
  };

  const handleSubmit = () => {
    if (lightOn) {
      setShowModal(true);
    } else {
      setNotificationModalOpen(true);
    }
  };


  return (
    <div className="relative overflow-x-auto mt-10">
      <div className="w-full flex my-6">
        <div className="w-full flex justify-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Tìm kiếm bằng mã hoặc tên sản phẩm"
            className="w-full border text-xl rounded-md px-3 py-2 mr-10"
          />  
        </div>
        <div
          className={`w-12 h-11 mr-10 mt-3 border rounded-full ${
            lightOn ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
        </div>
        <button
          onClick={handleSubmit}
          className="w-40 py-4 border bg-[#00827f] font-bold text-white rounded-lg text-lg"
        >
          Nhập kho
        </button>
      </div>

      <table className="w-full md:text-xl text-sm text-left rtl:text-right text-gray-500">
        <thead className="md:text-xl text-xs text-gray-700 uppercase border">
          <tr>
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
            <th scope="col" className="px-6 py-3 ">
              Ngày nhập
            </th>
            <th scope="col" className="px-6 py-3 ">
              Người nhập
            </th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((item, index) => (
              <tr
                key={item._id}
                className={
                  index % 2 === 0 ? "bg-white" : "bg-gray-100 border-b"
                }
              >
                <th className="px-6 py-4">{index + 1}</th>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.productCode}</td>
                <td className="px-6 py-4">{item.weight}KG</td>
                <td className="px-6 py-4">
                  {new Date(item.createdAt).toLocaleDateString("vn-vi")}
                </td>
                <td className="px-6 py-4">{item?.userImport?.name}</td>
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
              setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
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
              setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
            }
          >
            <IoIosArrowForward />
          </button>
        )}
      </div>

      <ModalImport
        showModal={showModal}
        onClose={onClose}
        fetchToken={fetchToken}
      />
      <NotificationModal
        isOpen={notificationModalOpen}
        onClose={() => setNotificationModalOpen(false)}
      />
    </div>
  );
}

export default Import;
