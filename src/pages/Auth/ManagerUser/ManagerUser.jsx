import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import * as authService from "~/service/authService";
import ModalAddUser from "./ModalAddUser";

function ManagerUser() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const itemsPerPage = 15;

  const fetch = () => {
    authService
      .getAll()
      .then((data) => {
        setData(data.data);
        setSearch(data.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const fetchToken = async () => {
      const currentToken = localStorage.getItem("token");
      if (!currentToken) {
        navigate("/login");
      } else {
        try {
          const decode = jwtDecode(currentToken);
          if (decode.role === 0) {
            fetch();
          } else {
            navigate("/");
          }
        } catch (error) {
          console.error("Error decoding JWT:", error);
        }
      }
    };

    fetchToken();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filteredData = data.filter(
      (item) =>
        (item.name && item.name.toLowerCase().includes(value.toLowerCase())) ||
        (item.email && item.email.toLowerCase().includes(value.toLowerCase()))
    );
    setSearch(filteredData);
  };

  const onAdd = (data) => {
    authService
      .addUser({ data })
      .then((res) => {
        if (res?.response?.data?.err.keyPattern.username > 0) {
          alert("Tài khoản đã tồn tại");
        } else {
          alert("Thêm thành công");
          setShowAdd(false);
          navigate("/user");
        }
      })
      .catch((err) => console.log(err));
  };

  const onClose = () => {
    setShowAdd(false);
  };

  const totalItems = search.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = search.slice(startIndex, endIndex);

  return (
    <div className="relative overflow-x-auto mt-10">
      <div className="w-full flex  my-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Tìm kiếm họ tên hoặc email"
          className="w-full text-xl border rounded-md px-3 py-2 mr-10"
        />
        <button
          className="w-56 py-4 border bg-[#00827f] font-bold text-white rounded-lg text-lg"
          onClick={() => setShowAdd(true)}
        >
          Thêm người dùng
        </button>
      </div>
      <table className="w-full md:text-xl text-sm text-left rtl:text-right text-gray-500">
        <thead className="md:text-xl text-xs text-gray-700 uppercase border">
          <tr>
            <th scope="col" className="px-6 py-3">
              <div className="flex cursor-pointer">STT</div>
            </th>
            <th scope="col" className="px-6 py-3 ">
              <div className="flex cursor-pointer">Tài khoản</div>
            </th>
            <th scope="col" className="px-6 py-3 ">
              <div className="flex cursor-pointer">Họ và tên</div>
            </th>
            <th scope="col" className="px-6 py-3 ">
              <div className="flex cursor-pointer">Email</div>
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
                <td className="px-6 py-4">{item.username}</td>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center">
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
          Page {currentPage} of {totalPages}
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
      <ModalAddUser showModal={showAdd} onAdd={onAdd} onClose={onClose} />
    </div>
  );
}

export default ManagerUser;
