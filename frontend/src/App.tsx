import { useEffect } from "react";
import "./App.css";
import { axiosInstance } from "./axios.config";

function App() {
  useEffect(() => {
    // (async () => {
    //   try {
    //     const response = await axiosInstance.get("/videos");
    //     console.log(response.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // })();
  }, []);
  return <div className="bg-white dark:bg-slate-800"></div>;
}

export default App;
