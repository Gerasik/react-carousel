import React from "react";
import styled from "styled-components";

const CarouselItem = styled.div`
  // width: 100vw;
  // float: left;
  // display: flex;
  // justify-content: center;
  // white-space: normal;
  // height: ${(props) => props.height};
  // iframe {
  //   width: auto !important;
  //   min-width: auto !important;
  // }
`;
// const CarouselItem = styled.div`
//   width: 100vw;
//   float: left;
//   display: flex;
//   justify-content: center;
//   white-space: normal;
//   height: ${(props) => props.height};
//   iframe {
//     width: auto !important;
//     min-width: auto !important;
//   }
// `;

export default ({ content, eventFunction }) => {
  return (
    <CarouselItem
      onTouchStart={(e) => {
        e.stopPropagation();
        e.preventDefault();
        eventFunction(e);
      }}
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
};
