"use client";
import { Button, Select, MultiSelect, Input, Loader } from "rizzui";
import { useState } from "react";
import { investorFinishPagedata } from "../../../../types/types";
import Form from "../../../components/shared/form/form";
import TextEditor from "../../../components/shared/text-editor";
import ImagePicker from "../../../components/shared/image-picker";
const experienceOptions = [
  { label: "Artificial Inteligence", value: "artificial_intelligence" },
  { label: "Web Development", value: "web_development" },
  { label: "Mobile Development", value: "mobile_development" },
];

const investingExperience = [
  { label: "1 to 2 years", value: "1_2_years" },
  { label: "3 to 5 years", value: "2_5_years" },
  { label: "5+ years", value: "5+_years" },
];
export default function InvestorFinishPage({
  submit,
  setIsSubmiting,
}: {
  setIsSubmiting: any;
  submit: (data: investorFinishPagedata) => void;
}) {
  const [experience, setExperience] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState([]);
  const [organizationName, setOrganizationName] = useState("");
  const [showError, setShowError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [bg, setBg] = useState("");
  const [content, setContent] = useState("");

  function getImageUrl(url: any) {
    setBg(url);
  }
  function formHandler(e: any) {
    e.preventDefault();
    if (
      organizationName.length <= 0 ||
      experienceLevel.length <= 0 ||
      experience === null ||
      bg === null ||
      content.length <= 0
    ) {
      setShowError(true);
    } else {
      const data = {
        organizationName,
        experience,
        experienceLevel,
        bg,
        content,
      };
      submit(data);
    }
  }
  return (
    <Form style="my-12 w-full">
      <Input
        onChange={(e) => setOrganizationName(e.target.value)}
        label="Enter your organization name"
        error={
          showError &&
          organizationName.length <= 0 &&
          "Please enter your organization name"
        }
      />
      <Select
        key={Math.random().toString()}
        label="Experience Level"
        options={investingExperience}
        value={experienceLevel}
        onChange={setExperienceLevel}
        error={
          showError &&
          experienceLevel === null &&
          "Please select your experience level"
        }
        data-headlessui-state="open"
      />
      <MultiSelect
        key={Math.random().toString()}
        label="Your Investing Experience"
        options={experienceOptions}
        value={experience}
        error={
          showError &&
          experience.length <= 0 &&
          "Please select your investing experience"
        }
        onChange={setExperience}
      />

      <ImagePicker
        multiple={false}
        getImageUrl={getImageUrl}
        onuploading={() => setIsUploading((prev) => !prev)}
      >
        <div
          className={`w-[100px] h-[100px] border ${
            showError && (bg === null || bg.length <= 0) && "border-red"
          } rounded-full flex justify-center flex-col items-center`}
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {isUploading && <Loader />}
        </div>
      </ImagePicker>
      <TextEditor content={content} setContent={setContent} />
      {content.length <= 0 && showError && (
        <p className="text-red-500">Please enter some content</p>
      )}
      {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
      <Button
        type="submit"
        size="xl"
        onClick={formHandler}
        isLoading={setIsSubmiting}
      >
        Finish
      </Button>
    </Form>
  );
}
