import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { CiEdit } from "react-icons/ci";

import ModalEdit from "./ModalEdit";
import ModalDelete from "~/components/ModalDelete";
import * as storedService from "~/service/storedService";

function DataWarehouse() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  const [sortBy, setSortBy] = useState({ key: "", ascending: true });
  const [currentPage, setCurrentPage] = useState(1);
  const [modalEdit, setModalEdit] = useState(false);
  const [dataID, setDataID] = useState([]);
  const [dataEdit, setDataEdit] = useState({});

  const itemsPerPage = 15;

  const fetch = () => {
    storedService
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
        (item.name &&
          item.productCode.toLowerCase().includes(value.toLowerCase()))
    );

    setSearch(filteredData);
  };

  const handleSort = (key) => {
    setSortBy((prevSort) => ({
      key,
      ascending: key === prevSort.key ? !prevSort.ascending : true,
    }));

    const sortedData = [...data].sort((a, b) => {
      const valueA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const valueB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

      if (sortBy.ascending) {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });

    setData(sortedData);
  };

  const handleSelect = (e) => {
    const id = e.target.value;
    const isSelected = dataID.some((item) => item.id === id);
    if (isSelected) {
      setDataID((prevData) => prevData.filter((item) => item.id !== id));
    } else {
      setDataID((prevData) => [...prevData, { id }]);
    }
  };

  const handleDelete = () => {
    storedService
      .deleteStored({ data: dataID })
      .then(() => {
        fetch();
        setDataID([]);
      })
      .catch((error) => console.log(error));
  };

  const onEdit = (data) => {
    storedService
      .editStored({ id: data._id, data: data })
      .then(() => {
        fetch();
        setModalEdit(false);
      })
      .catch((error) => console.log(error));
  };

  const onClose = () => {
    setModalEdit(false);
  };

  const totalItems = search.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = search.slice(startIndex, endIndex);

  return (
    <div className="relative overflow-x-auto mt-10">
      <div className="w-full flex my-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e)}
          placeholder="Tìm kiếm bằng mã hoặc tên sản phẩm"
          className="w-full text-xl border rounded-md px-3 py-2 mr-10"
        />
        <ModalDelete onDelete={handleDelete} disabled={dataID.length == 0} />
      </div>
      <table className="w-full md:text-xl text-sm text-left rtl:text-right text-gray-500">
        <thead className="md:text-xl text-xs text-gray-700 uppercase border">
          <tr>
            <th></th>
            <th scope="col" className="px-6 py-3">
              <div className="flex cursor-pointer">STT</div>
            </th>
            <th scope="col" className="px-6 py-3 ">
              <div className="flex cursor-pointer">Tên sản phẩm</div>
            </th>
            <th scope="col" className="px-6 py-3 ">
              <div className="flex cursor-pointer">Mã sản phẩm</div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 "
              onClick={() => handleSort("weight")}
            >
              <div className="flex cursor-pointer">
                Khối lượng
                {sortBy.key === "weight" &&
                  (sortBy.ascending ? (
                    <AiOutlineSortAscending size={16} />
                  ) : (
                    <AiOutlineSortDescending size={16} />
                  ))}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 "
              onClick={() => handleSort("date")}
            >
              <div className="flex cursor-pointer">
                Ngày nhập
                {sortBy.key === "date" &&
                  (sortBy.ascending ? (
                    <AiOutlineSortAscending size={16} />
                  ) : (
                    <AiOutlineSortDescending size={16} />
                  ))}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 "
              onClick={() => handleSort("update")}
            >
              <div className="flex cursor-pointer">
                Ngày sửa
                {sortBy.key === "date" &&
                  (sortBy.ascending ? (
                    <AiOutlineSortAscending size={16} />
                  ) : (
                    <AiOutlineSortDescending size={16} />
                  ))}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 "
              onClick={() => handleSort("location")}
            >
              <div className="flex cursor-pointer">
                Vị trí
                {sortBy.key === "location" &&
                  (sortBy.ascending ? (
                    <AiOutlineSortAscending size={16} />
                  ) : (
                    <AiOutlineSortDescending size={16} />
                  ))}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 "
              onClick={() => handleSort("note")}
            >
              <div className="flex cursor-pointer">
                Trạng thái
                {sortBy.key === "note" &&
                  (sortBy.ascending ? (
                    <AiOutlineSortAscending size={16} />
                  ) : (
                    <AiOutlineSortDescending size={16} />
                  ))}
              </div>
            </th>
            <th></th>
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
                <th className="px-6 py-4">
                  <input
                    type="checkbox"
                    value={item._id}
                    onChange={(e) => handleSelect(e)}
                    checked={dataID.some((data) => data.id === item._id)}
                  />
                </th>
                <th className="px-6 py-4">{index + 1}</th>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.productCode}</td>
                <td className="px-6 py-4">{item.weight}KG</td>
                <td className="px-6 py-4">
                  {new Date(item.createdAt).toLocaleDateString("vn-vi")}
                </td>
                <td className="px-6 py-4">
                  {new Date(item.updatedAt).toLocaleDateString("vn-vi")}
                </td>
                <td className="px-6 py-4">{item.location}</td>
                <td className="px-6 py-4">
                  {item.status == 0 ? "Trong kho" : "Đã xuất kho"}
                </td>
                <td>
                  <div
                    className="px-4 py-3 cursor-pointer"
                    onClick={() => {
                      setModalEdit(true);
                      setDataEdit(item);
                    }}
                  >
                    <CiEdit size={20} />
                  </div>
                </td>
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
      <ModalEdit
        showModal={modalEdit}
        onEdit={onEdit}
        onClose={onClose}
        data={dataEdit}
      />
    </div>
  );
}

export default DataWarehouse;
