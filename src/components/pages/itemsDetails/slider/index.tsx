import React, { Fragment } from "react";
import Slider from "react-slick";

import { MainPicture, PagingPicture, MainPictureContainer } from "./styles";

interface IProps {
  images: string[];
}

const ItemsPictureSlider = ({ images }: IProps) => {
  const settings = {
    customPaging: (index: number) => (
      <a>
        <PagingPicture src={images[index]} />
      </a>
    ),
    dotsClass: "slick-dots slick-thumb",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <Slider {...settings}>
        {images.map((elem, key) => (
          <MainPictureContainer key={key}>
            <MainPicture src={elem} />
          </MainPictureContainer>
        ))}
      </Slider>
    </div>
  );
};

export default ItemsPictureSlider;
