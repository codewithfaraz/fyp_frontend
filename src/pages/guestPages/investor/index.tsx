import { Select, Button } from "rizzui";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InvestorProfileCard from "../../../components/shared/investor/investor-profile-card";
import ImageCarousal from "../../../components/layout/ui/image-carousal";
import Card from "../../../components/layout/ui/card";
import HeadingPrimary from "../../../components/layout/ui/heading-primary";

export default function InvestorPage() {
  const users_ = {
    Business: [
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
      {
        name: "John Doe",
        userType: "Innvator",
        imageUrl: "https://randomuser.me/api/portraits/women/40.jpg",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quibusdam, voluptatum, quidem, quod autem fugit nemo quae quia voluptates doloribus quos. Quisquam quibusdam, voluptatum, quidem, quod autem fugit nemo quae quia voluptates doloribus quos.",
        skills: ["Technology", "Health care"],
      },
    ],
    Technology: [
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
    ],
    HealthCar: [
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
    ],
    Finance: [
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
    ],
    Environemnt: [
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
    ],
    Science: [
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
    ],
    CreativeArts: [
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
    ],
    Education: [
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
    ],
    SocialImpacts: [
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
    ],
  };
  const categories = [
    { label: "Technology", value: "technology" },
    { label: "HealthCar", value: "health care" },
    { label: "Finance", value: "finance" },
    { label: "Environemnt", value: "environemnt" },
    { label: "Business", value: "business" },
    { label: "Science", value: "science" },
    { label: "CreativeArts", value: "creative arts" },
    { label: "Education", value: "education" },
    { label: "SocialImpacts", value: "social impacts" },
    { label: "Industrial", value: "Industrial" },
    { label: "Products", value: "products" },
    { label: "Transportation", value: "transportation" },
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const username = useSelector((state: any) => state.user.user?.username);
  const navigate = useNavigate();
  function buttonClickHandler(e: any) {
    if (!username) {
      navigate("/sign-up");
    } else {
      navigate("/registeration/investor");
    }
  }
  return (
    <>
      <Card styles="flex flex-col">
        <HeadingPrimary styles="text-center text-sm">
          Discover ground breaking ideas and{" "}
          <span className="text-[#944500] underline">invest in the future</span>
          .<span className="text-green-900 underline">Empower innovators</span>{" "}
          and fuel the next wave of transformative technology.
        </HeadingPrimary>
        <Button
          variant="outline"
          className="self-center mt-6 px-12 py-6 text-xl"
          onClick={buttonClickHandler}
        >
          Join Investor Hub
        </Button>
        <Select
          label="Select Category"
          options={categories}
          className="mb-12 h-12"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e)}
        />
        <span className="">
          Trendings in
          <h1 className="text-3xl mb-4 font-bold">{selectedCategory.label}</h1>
        </span>
        <ImageCarousal
          settings={{
            slidesToShow: 3,
            autoplay: true,
            autoplaySpeed: 3000,
          }}
          styles="flex"
        >
          {users_[selectedCategory.label]?.map((user) => {
            return (
              <InvestorProfileCard user={user} key={Math.random().toString()} />
            );
          })}
        </ImageCarousal>
      </Card>
    </>
  );
}
