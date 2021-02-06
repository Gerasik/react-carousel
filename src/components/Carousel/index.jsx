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
  position: relative;
  margin: 0 0 30px;
`;

const EventContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Carousel = ({ data, height = "100vh", infinite, multiple }) => {
  const refContainer = useRef(null);
  const [eventStart, setEventStart] = useState(undefined);
  const [currentItem, setCurrentItem] = useState(1);
  const [transition, setTransition] = useState(true);
  const [arr, setArr] = useState([]);

  useEffect(() => {
    const { updatedData, scripts } = ejectScriptsFromData(data);
    const newUpdatedData = updatedData.map((item, id) => ({
      item,
      id: id + 1,
    }));
    if (infinite) {
      newUpdatedData.unshift(newUpdatedData.pop());
    }
    setArr(newUpdatedData);
    console.log(scripts);
    runScript(scripts);
  }, []);

  if (infinite) {
    useEffect(() => {
      setTransition(true);
      if (arr.length) {
        if (currentItem == arr[0].id) {
          setTimeout(() => {
            setTransition(false);
            setArr([arr[arr.length - 1], ...arr.slice(0, -1)]);
          }, 100);
          setTimeout(() => {
            setTransition(true);
          }, 600);
        }
        if (currentItem == arr[arr.length - 1].id) {
          setTimeout(() => {
            setTransition(false);
            const newArr = arr;
            newArr.push(newArr.shift());
            setArr([...arr.slice(1), arr[0]]);
          }, 100);
          setTimeout(() => {
            setTransition(true);
          }, 600);
        }
      }
    }, [currentItem]);
  }

  const handleClickPrev = () => {
    if (currentItem == 1 && !infinite) {
    } else if (currentItem - 1 == 0) {
      setCurrentItem(arr.length);
    } else {
      setCurrentItem(currentItem - 1);
    }
  };

  const handleClickNext = () => {
    if (currentItem == arr.length && !infinite) {
    } else if (currentItem + 1 > arr.length) {
      setCurrentItem(1);
    } else {
      setCurrentItem(currentItem + 1);
    }
  };

  const eventFunction = (event) => {
    switch (event.type) {
      case "mousedown":
        setEventStart(event.clientX);
        break;
      case "touchstart":
        setEventStart(event.changedTouches[0].clientX);
        break;
      case "mouseup":
      case "mouseleave":
      case "mouseover":
        if (eventStart - event.clientX < 0 && eventStart) {
          handleClickPrev();
        } else if (eventStart - event.clientX > 0 && eventStart) {
          handleClickNext();
        }
        setEventStart(undefined);
        break;
      case "touchend":
        if (eventStart - event.changedTouches[0].clientX < 0 && eventStart) {
          handleClickPrev();
        } else if (
          eventStart - event.changedTouches[0].clientX > 0 &&
          eventStart
        ) {
          handleClickNext();
        }
        setEventStart(undefined);
        break;

      default:
        break;
    }
  };

  return (
    <CarouselWrap ref={refContainer}>
      <CarouselNavigation
        height={height}
        disablePrev={currentItem == 1 && !infinite}
        disableNext={currentItem == arr.length && !infinite}
        handleClickPrev={handleClickPrev}
        handleClickNext={handleClickNext}
        setCurrentItem={setCurrentItem}
        arr={arr}
        currentItem={currentItem}
      />
      <EventContainer
        onMouseDown={eventFunction}
        onMouseUp={eventFunction}
        onTouchStart={eventFunction}
        onTouchEnd={eventFunction}
        onTouchMove={eventFunction}
      />
      <CarouselContainer
        transition={transition}
        currentItem={arr.findIndex((i) => i.id == currentItem)}
        multiple={multiple}
      >
        {arr.map(({ item }) => (
          <CarouselItem
            key={item}
            height={height}
            content={item}
            multiple={multiple}
          />
        ))}
      </CarouselContainer>
    </CarouselWrap>
  );
};

export default Carousel;
