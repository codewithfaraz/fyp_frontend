import { Button } from "rizzui";
import ImageCarousal from "../layout/ui/image-carousal";
import Card from "../layout/ui/card";
import HeadingPrimary from "../layout/ui/heading-primary";
import UnderlineShape from "../shape/underline";
import InnovatorImage from "../../assets/Images/users/innovator.png";
import InvestorImage from "../../assets/Images/users/investing.png";
import ExpertImage from "../../assets/Images/users/expert.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function GuestPageSlider() {
  const username = useSelector((state: any) => state.user.user?.username);

  const navigate = useNavigate();
  function clickHandler(userType: string) {
    if (!username) {
      navigate("/sign-up");
    } else {
      if (userType === "innovator") {
        navigate("/registeration/innovator");
      } else if (userType === "expert") {
        navigate("/registeration/expert");
      } else if (userType === "investor") {
        navigate("/registeration/investor");
      }
    }
  }
  return (
    <Card styles="my-24 text-center">
      <HeadingPrimary>
        Meet the Minds Behind{" "}
        <span className="inline-block text-green-900">
          Innovation
          <UnderlineShape />
        </span>
      </HeadingPrimary>
      <ImageCarousal>
        <div>
          <div className="flex items-center justify-around flex-col md:flex-row space-y-3 md:space-y-0">
            <div className="flex flex-col items-center md:space-y-8 space-y-2">
              <p className="text-center w-96 md:text-3xl text-2xl">
                Share your ground breaking ideas and transform industries. Bring
                your vision to life with the support of investors and experts.
              </p>
              <Button
                className=""
                onClick={(e) => {
                  e.preventDefault();
                  clickHandler("innovator");
                }}
              >
                Start as an innovator
              </Button>
            </div>
            <img
              src={InnovatorImage}
              alt="innovator"
              className="w-[200px] md:w-96"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-around flex-col md:flex-row space-y-3 md:space-y-0">
            <div className="flex flex-col items-center md:space-y-8 space-y-2">
              <p className="text-center w-96 md:text-3xl text-2xl">
                Offer your skills to shape and refine innovative ideas.
                Collaborate with visionaries to make meaningful contributions in
                your field.
              </p>
              <Button
                className=""
                onClick={(e) => {
                  e.preventDefault();
                  clickHandler("expert");
                }}
              >
                Start as an Expert
              </Button>
            </div>
            <img src={ExpertImage} alt="expert" className="w-[200px] md:w-96" />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-around flex-col md:flex-row space-y-3 md:space-y-0">
            <div className="flex flex-col items-center md:space-y-8 space-y-2">
              <p className="text-center w-96 md:text-3xl text-2xl">
                Discover and fund high-potential projects that align with your
                interests. Empower innovators and drive impactful change.
              </p>
              <Button
                className=""
                onClick={(e) => {
                  e.preventDefault();
                  clickHandler("investor");
                }}
              >
                Start as an Investor
              </Button>
            </div>
            <img
              src={InvestorImage}
              alt="investor"
              className="w-[200px] md:w-96 "
            />
          </div>
        </div>
      </ImageCarousal>
    </Card>
  );
}
