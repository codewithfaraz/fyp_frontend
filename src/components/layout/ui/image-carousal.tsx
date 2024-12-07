import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function ImageCarousal({
  children,
  settings,
  styles,
}: {
  styles?: string;
  settings?: any;
  children: React.ReactNode;
}) {
  const Defaultsettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dotsClass: "slick-dots slick-thumb",
    // autoplaySpeed: 5000,
    autoplay: false,
  };
  return (
    <Slider {...Defaultsettings} {...settings} className={`mt-12${styles}`}>
      {children}
    </Slider>
  );
}
