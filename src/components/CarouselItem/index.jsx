import React from "react";
import styled from "styled-components";

const CarouselItem = styled.div`
  min-width: ${({ multiple }) => (multiple ? "30%" : "100%")};
  display: flex;
  justify-content: center;
  white-space: normal;
  height: ${({ height }) => height};
  iframe {
    width: auto !important;
    min-width: auto !important;
  }
`;

export default ({ content, multiple }) => {
  return (
    <CarouselItem
      multiple={multiple}
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
};
