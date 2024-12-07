import { useState, useEffect } from "react";
import { Input, Select, FileInput, Button } from "rizzui";
import Card from "../../../../components/layout/ui/card";
import Form from "../../../../components/shared/form/form";
import { useForm } from "react-hook-form";
import {
  IdeaFinalStep,
  ideaFinalStep,
} from "../../../../../validators/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
export default function FinishStep({ onSubmit }: { onSubmit: any }) {
  const ideaStages = [
    { value: "refining", label: "Refining" },
    { value: "refined", label: "Refined" },
  ];
  const [stage, setStage] = useState(ideaStages[0]);
  const [isError, setIsError] = useState(false);
  const [fileState, setFileState] = useState<any>("");
  useEffect(() => {
    if (fileState.length <= 0) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [fileState]);
  //form handler
  function formSubmitHandler(e: any) {
    if (fileState.length > 0) {
      onSubmit({
        funds: e.funds,
        stage: stage,
        files: fileState,
      });
    }
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IdeaFinalStep>({
    resolver: zodResolver(ideaFinalStep),
  });
  return (
    <Card styles="px-3 space-y-6">
      <Form style="w-full" onSubmit={handleSubmit(formSubmitHandler)}>
        <Input
          type="number"
          label="Funds If required"
          {...register("funds")}
          error={errors.funds}
        />
        <Select
          name="stage"
          options={ideaStages}
          key={stage.label}
          value={stage.label}
          onChange={setStage}
        />
        <FileInput
          name="files"
          label="Upload Files"
          value={fileState}
          onChange={(e) => setFileState(e.target.value)}
          clearable={!!fileState}
          error={isError && "File is required"}
          onClear={() => {
            setFileState("");
          }}
        />
        <Button size="xl" type="submit">
          Finish
        </Button>
      </Form>
    </Card>
  );
}
