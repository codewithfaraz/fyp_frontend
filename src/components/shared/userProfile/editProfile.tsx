import { useState } from "react";
import { Button, Input, Select, MultiSelect } from "rizzui";
import ImagePicker from "../image-picker";
import TextEditor from "../text-editor";
const experienceLevelOptions = [
  { label: "1 to 2 years", value: "1_2_years" },
  { label: "3 to 5 years", value: "2_5_years" },
  { label: "5+ years", value: "5+_years" },
];
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
export default function EditProfile({
  data,
  userType,
  cancelButtonClick,
  onSave,
}: {
  data: any;
  onSave:any
  userType: string;
  cancelButtonClick: any;
}) {
  const [bg, setBg] = useState(data.imageUrl);
  const [state, setState] = useState(data.shortBio);
  const [content, setContent] = useState(data.profileDescription);
  const [experties, setExperience] = useState(
    data.InvestingExperience || data.experties || []
  );
  const [firstName, setFirstName] = useState(data.firstName || "");
  const [lastName, setLastName] = useState(data.lastName || "");
  const [country, setCountry] = useState(data.country || "");
  const [city, setCity] = useState(data.city || "");
  const [skills, setSkills] = useState(data.skills || []);
  const [yearsOfExperience, setYearsOfExperience] = useState(
    experienceLevelOptions.find((item) => item.value === data.yearsOfExperience)
  );
  function getImageUrl(url: any) {
    setBg(url);
  }
  function saveFormHandler(data: any) {
    data.preventDefault();
    onSave({
      firstName,
      lastName,
      country,
      skills,
      city,
      yearsOfExperience,
      state,
      bg,
      content,
      experties,
    })
  }
  return (
    <div className=" p-4 rounded-lg">
      <h1 className="text-2xl text-black font-bold">Edit Profile</h1>
      <form className="flex flex-col space-y-4" onSubmit={saveFormHandler}>
        <ImagePicker
          multiple={false}
          getImageUrl={getImageUrl}
          onuploading={() => {}}
        >
          <div
            className={`w-[100px] h-[100px] border rounded-full flex justify-center flex-col items-center`}
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </ImagePicker>
        <div className="flex space-x-2">
          <Input
            label="First Name"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={firstName}
            className="flex-1"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            type="text"
            label="Last Name"
            name="lastName"
            placeholder="Last Name"
            value={lastName}
            className="flex-1"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="flex space-x-3">
          <Input
            label="Country"
            type="text"
            name="country"
            placeholder="Country"
            value={country}
            className="flex-1"
            onChange={(e) => setCountry(e.target.value)}
          />
          <Input
            label="City"
            type="text"
            name="city"
            placeholder="City"
            value={city}
            className="flex-1"
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <Select
          key={Math.random().toString()}
          value={yearsOfExperience}
          options={experienceLevelOptions}
          placeholder="Years of Experience"
          onChange={(value) => setYearsOfExperience(value)}
        />
        <Input
          label="Short Bio"
          value={state}
          maxLength={200}
          onChange={(e) => setState(() => e.target.value)}
          suffix={state.length + `/200`}
          suffixClassName="opacity-70"
        />
        <label className="font-semibold">Edit Profile</label>
        <TextEditor content={content} setContent={setContent} />
        <MultiSelect
          key={Math.random().toString()}
          label="Your Experties"
          options={experienceOptions}
          value={experties}
          onChange={(value) => setExperience(value)}
        />
        {userType === "innovator" && (
          <MultiSelect
            key={Math.random().toString()}
            label="Your Skills"
            options={skillsOptions}
            value={skills}
            onChange={(value) => setSkills(value)}
          />
        )}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => cancelButtonClick()}
            className="w-24"
          >
            Cancel
          </Button>
          <Button className="w-24" type="submit">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
