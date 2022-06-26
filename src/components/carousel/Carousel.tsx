import React from "react";
import styles from "./Carousel.module.css";
import { Image, Carousel as AntCarousel } from "antd";

import carouseImage1 from "../../assets/images/carousel_1.jpg";
import carouseImage2 from "../../assets/images/carousel_2.jpg";
import carouseImage3 from "../../assets/images/carousel_3.jpg";

export const Carousel: React.FC = () => {
    return <AntCarousel autoplay className={styles.slider}>
        <Image src={carouseImage1} />
        <Image src={carouseImage2} />
        <Image src={carouseImage3} />
    </AntCarousel>
}