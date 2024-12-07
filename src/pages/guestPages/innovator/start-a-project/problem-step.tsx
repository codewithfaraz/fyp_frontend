import { Textarea, Button } from "rizzui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "../../../../components/layout/ui/card";
import Form from "../../../../components/shared/form/form";

import {
  IdeaSecondStep,
  ideaSecondStep,
} from "../../../../../validators/zod-schemas";

export default function ProblemStep({ onSubmit }: { onSubmit: any }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IdeaSecondStep>({
    resolver: zodResolver(ideaSecondStep),
  });

  return (
    <Card styles="px-3 space-y-6">
      <Form style="w-full" onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          label="Problem Description"
          {...register("problemDescription")}
          error={errors.problemDescription && errors.problemDescription.message}
        />
        <Textarea
          label="Proposed Solution"
          {...register("proposedSolution")}
          error={errors.proposedSolution && errors.proposedSolution.message}
        />
        <Textarea
          label="Innovative Aspects"
          {...register("innovativeAspects")}
          error={errors.innovativeAspects && errors.innovativeAspects.message}
        />
        <Textarea
          label="Market Need"
          {...register("marketNeeded")}
          error={errors.marketNeeded && errors.marketNeeded.message}
        />
        <Textarea
          label="Targeted Audiance"
          {...register("targetedAudience")}
          error={errors.targetedAudience && errors.targetedAudience.message}
        />
        <Textarea
          label="Competitive Analysis"
          {...register("competitiveAnalysis")}
          error={
            errors.competitiveAnalysis && errors.competitiveAnalysis.message
          }
        />
        <Button size="xl" type="submit">
          Next
        </Button>
      </Form>
    </Card>
  );
}
