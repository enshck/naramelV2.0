import React, { useState, ReactType } from "react";

interface IProps {
  url: string;
  MainContainer: ReactType;
}

const ZoomablePicture = (props: IProps) => {
  const { url, MainContainer } = props;
  const [isHoverPicture, setStatusHoverPicture] = useState(false);
  const [xMouseCoordinate, setXMouseCoordinate] = useState(0);
  const [yMouseCoordinate, setYMouseCoordinate] = useState(0);

  const dynamicStyle = {
    transformOrigin: `${xMouseCoordinate}px ${yMouseCoordinate}px`,
    transform: "scale(2.5)",
  };
  const mouseInPicture = (e: any) => {
    const positionData = e.currentTarget.getBoundingClientRect();

    setXMouseCoordinate(e.clientX - positionData.left);
    setYMouseCoordinate(e.clientY - positionData.top);
    setStatusHoverPicture(true);
  };

  const mouseLeavePicture = (e: any) => {
    setStatusHoverPicture(false);
  };

  return (
    <MainContainer
      onMouseMove={mouseInPicture}
      onMouseLeave={mouseLeavePicture}
    >
      <img
        src={url}
        alt={"zoomable"}
        style={isHoverPicture ? dynamicStyle : {}}
      />
    </MainContainer>
  );
};

export default ZoomablePicture;
