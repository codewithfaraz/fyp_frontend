import { Button, Input, Textarea } from "rizzui";
import Hero from "../../components/shared/Header/hero";
import Card from "../../components/layout/ui/card";
import ImageCarousal from "../../components/layout/ui/image-carousal";
import InvestorProfileCard from "../../components/shared/investor/investor-profile-card";
import HeadingPrimary from "../../components/layout/ui/heading-primary";
export default function Innovator() {
  const users = [
    {
      name: "John Doe",
      userType: "Innvator",
      imageUrl: "https://randomuser.me/api/portraits/women/40.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quibusdam, voluptatum, quidem, quod autem fugit nemo quae quia voluptates doloribus quos. Quisquam quibusdam, voluptatum, quidem, quod autem fugit nemo quae quia voluptates doloribus quos.",
      skills: ["Technology", "Health care"],
    },
    {
      name: "John Doe",
      userType: "Innvator",
      imageUrl: "https://randomuser.me/api/portraits/women/40.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quibusdam, voluptatum, quidem, quod autem fugit nemo quae quia voluptates doloribus quos. Quisquam quibusdam, voluptatum, quidem, quod autem fugit nemo quae quia voluptates doloribus quos.",
      skills: ["Technology", "Health care"],
    },
    {
      name: "John Doe",
      userType: "Innvator",
      imageUrl: "https://randomuser.me/api/portraits/women/40.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quibusdam, voluptatum, quidem, quod autem fugit nemo quae quia voluptates doloribus quos. Quisquam quibusdam, voluptatum, quidem, quod autem fugit nemo quae quia voluptates doloribus quos.",
      skills: ["Technology", "Health care"],
    },
  ];
  return (
    <>
      <Hero buttonTitle="Start a Project" link="/innovator/start-a-project" />
      {/* investors */}
      <Card styles="my-24">
        <HeadingPrimary styles="my-12">
          <span className="text-[#A3705f] underline">Discover investors</span>{" "}
          aligned with your{" "}
          <span className="text-green-900 underline">vision</span>
        </HeadingPrimary>
        <ImageCarousal
          settings={{
            slidesToShow: 3,
            autoplay: true,
            autoplaySpeed: 3000,
          }}
          styles="flex"
        >
          {users.map((user) => {
            return <InvestorProfileCard user={user} />;
          })}
        </ImageCarousal>
      </Card>
      {/* experts */}
      <Card styles="my-24">
        <HeadingPrimary styles="my-12">
          <span className="text-[#A3705f] underline">Discover Experts</span>{" "}
          aligned with your{" "}
          <span className="text-green-900 underline">vision</span>
        </HeadingPrimary>
        <ImageCarousal
          settings={{
            slidesToShow: 3,
            autoplay: true,
            autoplaySpeed: 3000,
          }}
          styles="flex"
        >
          {users.map((user) => {
            return <InvestorProfileCard user={user} />;
          })}
        </ImageCarousal>
      </Card>
      <Card styles="p-12 max-w-2xl">
        <h1 className="text-center text-xl text-[#5c5858] my-5">
          Share Your Feedback and Suggestions for Improvement
        </h1>
        <form action="" className="space-y-5 flex flex-col">
          <div className="flex space-x-4">
            <Input className="flex-1" placeholder="Your name" />
            <Input className="flex-1" placeholder="Your Email" />
          </div>
          <Textarea placeholder="Enter your message" className="" />
          <Button className="self-start">Send</Button>
        </form>
      </Card>
    </>
  );
}
