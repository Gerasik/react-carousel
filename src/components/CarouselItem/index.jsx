import React from "react";
import styled from "styled-components";

const CarouselItem = styled.div`
  min-width: 100%;
  display: flex;
  justify-content: center;
  white-space: normal;
  height: ${(props) => props.height};
  iframe {
    width: auto !important;
    min-width: auto !important;
  }
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

export default ({ content }) => {
  return (
    <CarouselItem
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
};
