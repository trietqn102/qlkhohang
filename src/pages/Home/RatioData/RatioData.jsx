import { useEffect, useState } from "react";
import PieChart from "~/components/Chart/Piechart";
import * as storedService from "~/service/storedService";
function RatioData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    storedService
      .getAll()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const totalImport = data.reduce(function (sum, product) {
    if (product.status === 0) {
      return sum + product.weight;
    } else {
      return sum;
    }
  }, 0);

  return <PieChart ratio={totalImport} />;
}

export default RatioData;
