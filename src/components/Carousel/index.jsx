import React, { useEffect, useState, useRef } from "react";
import { ejectScriptsFromData, runScript } from "../../services";
import styled from "styled-components";
import CarouselContainer from "../CarouselContainer";
import CarouselNavigation from "../CarouselNavigation";
import CarouselItem from "../CarouselItem";

const CarouselWrap = styled.div`
  overflow: hidden;
  width: 100vw;
  display: flex;
  flex-wrap: nowrap;
`;

// const CarouselWrap = styled.div`
//   overflow: hidden;
//   width: 100vw;
// `;

const Carousel = ({ data, height = "100vh" }) => {
  const refContainer = useRef(null);
  const [eventStart, setEventStart] = useState(undefined);
  const [containerWidth, setContainerWidth] = useState(undefined);
  const [currentItem, setCurrentItem] = useState(1);
  const [transition, setTransition] = useState(true);
  const [arr, setArr] = useState([]);

  useEffect(() => {
    const { updatedData, scripts } = ejectScriptsFromData(data);
    const newUpdatedData = updatedData.map((item, id) => ({
      item,
      id: id + 1,
    }));
    newUpdatedData.unshift(newUpdatedData.pop());
    runScript(scripts);
    setContainerWidth(0);
    // setContainerWidth(-refContainer.current.offsetWidth);
    setArr(newUpdatedData);
  }, []);

  useEffect(() => {
    setTransition(true);
    if (arr.length) {
      if (currentItem == arr[0].id) {
        setTimeout(() => {
          setTransition(false);
          setArr([arr[arr.length - 1], ...arr.slice(0, -1)]);
          setContainerWidth(-refContainer.current.offsetWidth);
        }, 100);
        setTimeout(() => {
          setTransition(true);
        }, 400);
      }
      if (currentItem == arr[arr.length - 1].id) {
        setTimeout(() => {
          setTransition(false);
          const newArr = arr;
          newArr.push(newArr.shift());
          setArr([...arr.slice(1), arr[0]]);
          setContainerWidth(
            -refContainer.current.offsetWidth * (arr.length - 2)
          );
        }, 100);
        setTimeout(() => {
          setTransition(true);
        }, 400);
      }
    }
  }, [currentItem]);

  const handleClickPrev = () => {
    if (currentItem - 1 == 0) {
      setCurrentItem(arr.length);
    } else {
      setCurrentItem(currentItem - 1);
    }
    setContainerWidth(containerWidth + refContainer.current.offsetWidth);
  };

  const handleClickNext = () => {
    if (currentItem + 1 > arr.length) {
      setCurrentItem(1);
    } else {
      setCurrentItem(currentItem + 1);
    }
    setContainerWidth(containerWidth - refContainer.current.offsetWidth);
  };

  const eventFunction = (event) => {
    event.preventDefault();
    switch (event.type) {
      case "mousedown":
        setEventStart(event.clientX);
        break;
      case "mouseup":
      case "mouseleave":
      case "mouseover":
        console.log(eventStart, event.clientX);
        if (eventStart - event.clientX < 0 && eventStart) {
          handleClickPrev();
        } else if (eventStart - event.clientX > 0 && eventStart) {
          handleClickNext();
        }
        setEventStart(undefined);
        break;

      default:
        break;
    }
    console.log("move", event.type);
  };

  return (
    <CarouselWrap
      ref={refContainer}
      onTouchMoveCapture={(e) => {
        e.stopPropagation();
        e.preventDefault();

        eventFunction(e);
      }}
    >
      <CarouselNavigation
        height={height}
        handleClickPrev={handleClickPrev}
        handleClickNext={handleClickNext}
      />
      <CarouselContainer
        eventFunction={eventFunction}
        containerWidth={containerWidth}
        transition={transition}
      >
        {arr.map(({ item }) => (
          <CarouselItem
            eventFunction={eventFunction}
            key={item}
            height={height}
            content={item}
          />
        ))}
      </CarouselContainer>
    </CarouselWrap>
  );
};

export default Carousel;
