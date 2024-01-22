import PropTypes from "prop-types";
import { Chart } from "react-google-charts";

function PieChart({ ratio }) {
  const data = [
    ["Task", "Hours per Day"],
    ["Sản phẩm trong", ratio],
    ["Kho trống", 1100 - ratio],
  ];

  const options = {
    is3D: true,
    chartArea: { left: 10, top: 10, width: "90%", height: "80%" },
    legend: { position: "bottom" },
  };

  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"500px"}
    />
  );
}

PieChart.propTypes = {
  ratio: PropTypes.number.isRequired,
};

export default PieChart;
