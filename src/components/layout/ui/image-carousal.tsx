import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function ImageCarousal({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = {
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
    <Slider {...settings} className="mt-12">
      {children}
    </Slider>
  );
}
