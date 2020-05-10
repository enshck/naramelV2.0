import React, { ReactNode, useEffect, useRef } from "react";
import Slider from "react-slick";

import {
  MainPicture,
  PagingPicture,
  MainPictureContainer,
  PagingPictureContainer,
  DotsContainer,
  DotsList,
} from "./styles";
import ZoomableImage from "components/zoomablePicture";

interface IProps {
  images: string[];
}

const ItemsPictureSlider = ({ images }: IProps) => {
  const slider = useRef<any>(null);

  useEffect(() => {
    slider.current.slickGoTo(0, false);
  }, [images]);

  const settings = {
    customPaging: (index: number) => (
      <PagingPictureContainer>
        <PagingPicture src={images[index]} />
      </PagingPictureContainer>
    ),
    appendDots: (dots: ReactNode) => (
      <DotsContainer>
        <DotsList>{dots}</DotsList>
      </DotsContainer>
    ),
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div>
      <Slider ref={slider} {...settings}>
        {images.map((elem, key) => (
          <MainPictureContainer key={key}>
            <ZoomableImage url={elem} MainContainer={MainPicture} />
          </MainPictureContainer>
        ))}
      </Slider>
    </div>
  );
};

export default ItemsPictureSlider;
