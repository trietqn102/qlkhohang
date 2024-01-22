import AllDataMonth from "./AllDataMonth";
import RatioData from "./RatioData";
import StoredLocation from "./StoredLocation";

function Home() {
  return (
    <div className="w-full flex flex-col items-center my-32">
      <div className="flex items-end justify-center mb-32 w-full h-full">
        <div className="w-1/2 mx-32">
          <AllDataMonth />
          <p className="text-center text-xl font-bold">
            Thống kê hàng hóa trong tháng
          </p>
        </div>

        <div className="w-1/2 mx-32">
          <RatioData />
          <p className="text-center text-xl font-bold">
            Khối lượng hàng hóa trong kho
          </p>
        </div>
      </div>
      <div className="w-11/12">
        <StoredLocation />
      </div>
    </div>
  );
}

export default Home;
