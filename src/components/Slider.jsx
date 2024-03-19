import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Spinner from "./Spinner";

const Slider = ({ imgList, className, ...rest }) => {
  if (!imgList) return <Spinner />;

  return (
    <Swiper
      {...rest}
      modules={[Navigation, Pagination, A11y, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      navigation={true}
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000 }}
      grabCursor={true}
      loop={true}
      className={`mySwiper ${className}`}
    >
      {imgList.map((src, idx) => (
        <SwiperSlide key={idx}>
          <img className="simage" src={src} alt={src} loading="lazy" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
