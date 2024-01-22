import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import * as storedService from "~/service/storedService";

const StoredLocation = () => {
  const [dataStored, setDataStored] = useState([]);

  useEffect(() => {
    storedService
      .getAll()
      .then((res) => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const filteredData = res.data.filter(
          (item) => new Date(item.createdAt).getMonth() + 1 === currentMonth
        );

        setDataStored(filteredData);
      })
      .catch((err) => console.log(err));
  }, []);

  const positions = Array.from({ length: 11 }, (_, i) => i + 1);
  const totalWeightPerPosition = 100;

  const getDataByLocation = (location) => {
    return dataStored.filter(
      (item) => item.location === location && item.status === 0
    );
  };

  const calculateTotalWeightByLocation = (location) => {
    const dataByLocation = getDataByLocation(location);
    return dataByLocation.reduce(
      (totalWeight, item) => totalWeight + item.weight,
      0
    );
  };

  const totalWeightsByLocation = positions.map((pos) =>
    calculateTotalWeightByLocation(pos)
  );

  const data = {
    labels: positions.map((pos) => `Vị trí ${pos}`),
    datasets: [
      {
        label: "Khối lượng trong kho",
        data: totalWeightsByLocation.map((weight) => weight),
        backgroundColor: "#FF6384",
      },
      {
        label: "Khối lượng Trống",
        data: totalWeightsByLocation.map(
          (weight) => totalWeightPerPosition - weight
        ),
        backgroundColor: "#36A2EB",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        max: totalWeightPerPosition,
      },
    },
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
      <h2 className="text-center my-10 text-xl font-bold">
        Biểu đồ Cột Chồng Khối Lượng Hàng trong Kho
      </h2>
    </div>
  );
};

export default StoredLocation;
