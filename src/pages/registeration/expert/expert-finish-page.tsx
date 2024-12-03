"use client";
import { Button, Select, MultiSelect, Loader } from "rizzui";
import { useState } from "react";
import { useSelector } from "react-redux";
import { expertFinishPageData } from "../../../../types/types";
import Form from "../../../components/shared/form/form";
import TextEditor from "../../../components/shared/text-editor";
import ImagePicker from "../../../components/shared/image-picker";
const experienceOptions = [
  { label: "Artificial Inteligence", value: "artificial_intelligence" },
  { label: "Web Development", value: "web_development" },
  { label: "Mobile Development", value: "mobile_development" },
];

const experienceLevelOptions = [
  { label: "1 to 2 years", value: "1_2_years" },
  { label: "3 to 5 years", value: "2_5_years" },
  { label: "5+ years", value: "5+_years" },
];
export default function ExpertFinishPage({
  submit,
  setIsSubmiting,
}: {
  submit: (data: expertFinishPageData) => void;
  setIsSubmiting?: any;
}) {
  const [experience, setExperience] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState([]);
  const [bg, setBg] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [content, setContent] = useState("");
  const [showError, setShowError] = useState(false);
  console.log(content);
  function getImageUrl(url: any) {
    setBg(url);
  }
  function formHandler(e: any) {
    e.preventDefault();
    if (
      experience.length <= 0 ||
      experienceLevel.length <= 0 ||
      bg === null ||
      content.length <= 0
    ) {
      setShowError(true);
    } else {
      const data = {
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
      <MultiSelect
        key={Math.random().toString()}
        label="Your Experties"
        options={experienceOptions}
        value={experience}
        error={
          showError &&
          experience.length <= 0 &&
          "Please select your investing experience"
        }
        onChange={setExperience}
      />
      <div data-headlessui-state="open">
        <Select
          key={Math.random().toString()}
          label="Experience Level"
          options={experienceLevelOptions}
          value={experienceLevel}
          error={
            showError &&
            experienceLevel.length <= 0 &&
            "Please select your experience level"
          }
          onChange={setExperienceLevel}
          data-headlessui-state="open"
        />
      </div>
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
