"use client";
import { Select } from "rizzui";
import Link from "next/link";
import { useState, useRef } from "react";
import Form from "@/components/shared/form/form";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";
import { fireBaseDB } from "@/lib/firebaseConfig";
const options = [
  { label: "Artificial Inteligence", value: "artificial_intelligence" },
  { label: "Web Development", value: "web_development" },
  { label: "Mobile Development", value: "mobile_development" },
];
const options2 = [
  { label: "Javascript", value: "javascript" },
  { label: "Reactjs", value: "reactjs" },
  { label: "Nodejs", value: "nodejs" },
  { label: "React Native", value: "react_native" },
];
const options3 = [
  { label: "1 to 2 years", value: "1_2_years" },
  { label: "3 to 5 years", value: "2_5_years" },
  { label: "5+ years", value: "5+_years" },
];
export default function InnovatorFinishForm() {
  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);
  const fileInputRef = useRef();
  const uploadFileToFirebase = async (file) => {
    console.log(file);
    try {
      console.log(file);
      const imgRef = ref(fireBaseDB, `fyp profile images/${v4()}`);
      const uploadTask = uploadBytesResumable(imgRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% complete");
        },
        (error) => {
          console.error("Error uploading image:", error);
        },
        async () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            const fileUrl = downloadURL;
            console.log(fileUrl);
          });
        }
      );
    } catch (err) {
      console.log("error occur");
    }
  };
  return (
    <Form style="my-12 w-full ">
      <Select
        key={Math.random().toString()}
        label="Your Experties"
        options={options}
        value={value}
        onChange={setValue}
      />
      <Select
        key={Math.random().toString()}
        label="Skills"
        options={options2}
        value={value2}
        onChange={setValue2}
      />
      <div data-headlessui-state="open">
        <Select
          key={Math.random().toString()}
          label="Experience Level"
          options={options3}
          value={value3}
          onChange={setValue3}
          data-headlessui-state="open"
        />
      </div>
      <div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={uploadFileToFirebase}
        />
        <div className="w-[100px] h-[100px] border rounded-full flex justify-center flex-col items-center">
          <button
            type="button"
            className="text-blue-900 text-sm"
            onClick={() => fileInputRef.current?.click()}
          >
            upload image
          </button>
        </div>
      </div>
    </Form>
  );
}
