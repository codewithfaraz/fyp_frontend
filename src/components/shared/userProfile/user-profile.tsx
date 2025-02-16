import { useState } from "react";
import { Input, Button, Select } from "rizzui";
import { GenderOptions } from "../../../../data/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserProfile, userProfile } from "../../../../validators/zod-schemas";
import Form from "../../../components/shared/form/form";

export default function UserProfle({
  submit,
}: {
  submit: (data: UserProfile) => void;
}) {
  const [currentGender, setCurrentGender] = useState(GenderOptions[0]);
  const [state, setState] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfile>({
    resolver: zodResolver(userProfile),
  });

  const today = new Date().toISOString().split("T")[0];

  return (
    <Form style="my-12 w-full" onSubmit={handleSubmit(submit)}>
      <Input
        label="First Name"
        placeholder="Enter your first name"
        {...register("firstName")}
        error={errors.firstName?.message}
      />
      <Input
        label="Last Name"
        placeholder="Enter your last name"
        {...register("lastName")}
      />

      <Select
        options={GenderOptions}
        label="Gender"
        value={currentGender}
        key={Math.random().toString()}
        // {...register("gender")}
        onChange={(option: any) => setCurrentGender(option)} // Ensure the onChange handler is correct
      />
      <Input
        label="Short Bio"
        value={state}
        maxLength={200}
        error={errors.shortBio?.message}
        {...register("shortBio")}
        onChange={(e) => setState(() => e.target.value)}
        suffix={state.length + `/200`}
        suffixClassName="opacity-70"
      />
      <Input
        type="date"
        label="Date of Birth"
        {...register("dateOfBirth")}
        error={errors.dateOfBirth?.message}
        max={today}
      />
      <Button size="xl" type="submit">
        Next
      </Button>
    </Form>
  );
}
