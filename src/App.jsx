import React from "react";
import mockData from "./mockData";
import Carousel from "./components/Carousel/index.jsx";

const App = () => {
  return (
    <>
      {/* <Carousel data={mockData} height="400px" /> */}
      <Carousel data={mockData} infinite={true} />
      <Carousel data={mockData} />
    </>
  );
};

export default App;
