import { useEffect, useState } from "react";

import Bars from "~/components/Chart/Bars";
import * as storedService from "~/service/storedService";

function AllDataMonth() {
  const [data, setData] = useState([]);

  useEffect(() => {
    storedService
      .getAll()
      .then((res) => {
        // Lọc dữ liệu theo tháng hiện tại
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const filteredData = res.data.filter(
          (item) => new Date(item.createdAt).getMonth() + 1 === currentMonth
        );

        setData(filteredData);
      })
      .catch((err) => console.log(err));
  }, []);

  const totalImport = data.reduce(function (sum, product) {
    if (product.status === 0) {
      return sum + product.weight;
    } else {
      return sum;
    }
  }, 0);

  const totalExport = data.reduce(function (sum, product) {
    if (product.status === 1) {
      return sum + product.weight;
    } else {
      return sum;
    }
  }, 0);

  const totalAll = data.reduce(function (sum, product) {
    return sum + product.weight;
  }, 0);

  const dataAllMonth = [totalImport, totalExport, totalAll];
  const labels = ["Hàng nhập", "Hàng xuất", "Tổng số hàng hóa"]

  return (
    <Bars data={dataAllMonth} labels={labels}/>
  );
}

export default AllDataMonth;
