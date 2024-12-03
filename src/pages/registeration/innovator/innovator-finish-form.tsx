"use client";
import { Button, Select, MultiSelect, Loader } from "rizzui";
import { useState } from "react";
import Form from "../../../components/shared/form/form";
import TextEditor from "../../../components/shared/text-editor";
import ImagePicker from "../../../components/shared/image-picker";
import { innovatorFinishPagedata } from "../../../../types/types";
const experienceOptions = [
  { label: "Artificial Inteligence", value: "artificial_intelligence" },
  { label: "Web Development", value: "web_development" },
  { label: "Mobile Development", value: "mobile_development" },
];
const skillsOptions = [
  { label: "Javascript", value: "javascript" },
  { label: "Reactjs", value: "reactjs" },
  { label: "Nodejs", value: "nodejs" },
  { label: "React Native", value: "react_native" },
];
const experienceLevelOptions = [
  { label: "1 to 2 years", value: "1_2_years" },
  { label: "3 to 5 years", value: "2_5_years" },
  { label: "5+ years", value: "5+_years" },
];
export default function InnovatorFinishForm({
  submit,
  setIsSubmiting,
}: {
  setIsSubmiting?: any;
  submit: (data: innovatorFinishPagedata) => void;
}) {
  const [experience, setExperience] = useState([]);
  const [showError, setShowError] = useState(false);
  const [skills, setSkills] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState(null);
  const [bg, setBg] = useState("");
  const [content, setContent] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  function getImageUrl(url: any) {
    setBg(url);
  }
  //handling form submit
  function handleSubmit(e: any) {
    e.preventDefault();
    if (
      experience.length <= 0 ||
      skills.length <= 0 ||
      experienceLevel === null ||
      bg === null ||
      bg.length <= 0 ||
      content.length <= 0
    ) {
      setShowError(true);
    } else {
      const data = { experience, skills, experienceLevel, bg, content };
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
          "Please select at least one option"
        }
        onChange={(value) => setExperience(value)}
      />
      <MultiSelect
        key={Math.random().toString()}
        label="Skills"
        options={skillsOptions}
        value={skills}
        error={
          showError && skills.length <= 0 && "Please select at least one option"
        }
        onChange={(value) => setSkills(value)}
      />
      <div data-headlessui-state="open">
        <Select
          key={Math.random().toString()}
          label="Experience Level"
          options={experienceLevelOptions}
          value={experienceLevel}
          error={
            showError &&
            experienceLevel == null &&
            "Please select at least one option"
          }
          onChange={(value) => setExperienceLevel(value)}
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
      {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
      {content.length <= 0 && showError && (
        <p className="text-red-500">Please enter some content</p>
      )}
      <Button
        type="submit"
        size="xl"
        onClick={handleSubmit}
        isLoading={setIsSubmiting}
      >
        Finish
      </Button>
    </Form>
  );
}
