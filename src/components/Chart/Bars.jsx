import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { LinearScale } from "chart.js";

const Bars = ({ data, labels }) => {
  LinearScale.id = "linear";
  LinearScale.defaults = {};

  const chartData = {
    labels: labels,
    datasets: [
      {
        backgroundColor: [
          "rgba(75,192,192, 0.8)",
          "rgba(255, 0, 0, 0.6)",
          "rgba(0, 0, 0, 0.4)",
        ],
        borderColor: "rgba(75,192,192,.4)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: data,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    aspectRatio: 1,
  };

  return (
    <div className="my-12">
      <Bar data={chartData} options={options} />
    </div>
  );
};

Bars.propTypes = {
  data: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
};

export default Bars;
