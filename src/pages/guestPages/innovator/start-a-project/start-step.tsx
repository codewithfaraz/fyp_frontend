import { useState } from "react";
import { Input, Textarea, Button, Select } from "rizzui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "../../../../components/layout/ui/card";
import { mainCategories } from "../../../../../data/categories";
import Form from "../../../../components/shared/form/form";
import {
  IdeaFirstStep,
  ideaFirstStep,
} from "../../../../../validators/zod-schemas";

export default function StartStep({ onSubmit }: { onSubmit: any }) {
  const [state, setState] = useState("");
  const [isError, setIsError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(mainCategories[0]);
  const MAXLENGTH = 200;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IdeaFirstStep>({
    resolver: zodResolver(ideaFirstStep),
  });
  //form submit handler
  function submit(data: IdeaFirstStep) {
    if (state.length > 0) {
      setIsError(false);
    }
    if (state.length <= 0) {
      setIsError(true);
      return;
    } else if (!isError && state.length > 0) {
      onSubmit({
        title: data.title,
        shortDescription: state,
        category: selectedCategory.value,
      });
    }
  }
  return (
    <Card styles="px-3 space-y-6">
      <Form style="w-full" onSubmit={handleSubmit(submit)}>
        <Input
          label="Title"
          className="flex-1"
          {...register("title")}
          error={errors.title && "Title is required"}
        />
        <Textarea
          error={
            isError && state.length <= 0 && "Short Description is required"
          }
          label="Short Description"
          value={state}
          maxLength={300}
          onChange={(e) => setState(e.target.value)}
          renderCharacterCount={({ characterCount, maxLength }) => (
            <div className="text-right text-sm opacity-70 rtl:text-left">
              {characterCount}/{maxLength}
            </div>
          )}
        />
        <Select
          label="Category"
          key={selectedCategory.value}
          options={mainCategories}
          value={selectedCategory}
          onChange={setSelectedCategory}
        />
        <Button size="xl" type="submit">
          Next
        </Button>
      </Form>
    </Card>
  );
}
