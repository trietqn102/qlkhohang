import axios from "axios";

export const postDoa = async ({ doa, time }) => {
  const data = {
    Public: {
      Input: {
        Schema: {
          Personal: "Control Servo",
          Private: "Convert DOA to PWM ",
          Public: "input and output",
        },
        Data: { Time: time, DOA: doa },
        Info: { author: "M.Triet", ver: "9/14/2023" },
        Path: { db: "data", Collection: "data" },
      },
      Output: {
        Schema: {
          Personal: "Control Servo",
          Private: "Convert DOA to PWM ",
          Public: "input and output",
        },
        data: { Time: null, value: null },
        Info: { author: "M.Triet", ver: "9/14/2023" },
        Path: { db: "data", CollectionInput: "data" },
      },
      Info: { name: "DOA application controls the Robot Arm" },
    },
    private: {
      getData: { angle: null },
      setData: null,
      tempInput: { data_temp: null, position: null, area: null },
      tempOutput: { Pulse: null, position: null, area: null },
      processing: "$MongoDB",
    },
    Personal: {
      Summary: "Thong tin them ",
      noted: "JSON schema DOA application ",
      ver: "12/14/2023",
    },
  };
  
    try {
      const res = axios.post(
        "https://us-east-1.aws.data.mongodb-api.com/app/application-0-sznak/endpoint/postdata",
        data
      );
      return res;
    } catch (error) {
      return error;
    }
};
