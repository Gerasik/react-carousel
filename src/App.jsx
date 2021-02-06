import React from "react";
import mockData from "./mockData";
import Carousel from "./components/Carousel/index.jsx";

const App = () => {
  return (
    <>
      {/* <Carousel data={mockData} height="400px" /> */}
      <Carousel data={mockData} infinite={true} />
      <Carousel data={mockData} />
      <Carousel data={mockData} infinite={true} multiple={true} />
      <Carousel data={mockData} multiple={true} />
    </>
  );
};

export default App;
