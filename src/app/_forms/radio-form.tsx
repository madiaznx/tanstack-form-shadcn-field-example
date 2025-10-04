"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { revalidateLogic, useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

const radioFormSchema = z.object({
  experience: z.string().min(1, "Please select your experience level"),
});

type RadioFormData = z.infer<typeof radioFormSchema>;

const defaultValues: RadioFormData = {
  experience: "",
};

export default function RadioForm() {
  const form = useForm({
    defaultValues: defaultValues,
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: radioFormSchema,
      onSubmitAsync: async ({ value }) => {
        const experienceLabels: Record<string, string> = {
          beginner: "Beginner (0-1 years)",
          intermediate: "Intermediate (2-5 years)",
          advanced: "Advanced (6-10 years)",
          expert: "Expert (10+ years)",
        };
        toast.success("Experience level saved!", {
          description: `Level: ${experienceLabels[value.experience] || value.experience}`,
        });
        form.reset();
      },
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Experience Assessment</CardTitle>
        <CardDescription>
          Help us understand your skill level to provide appropriate content and recommendations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          <form.Field
            name="experience"
            children={(field) => (
              <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                <FieldLabel>Experience Level</FieldLabel>
                <RadioGroup
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beginner" id="beginner" />
                    <FieldLabel htmlFor="beginner">Beginner (0-1 years)</FieldLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <FieldLabel htmlFor="intermediate">Intermediate (2-5 years)</FieldLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="advanced" id="advanced" />
                    <FieldLabel htmlFor="advanced">Advanced (6-10 years)</FieldLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="expert" id="expert" />
                    <FieldLabel htmlFor="expert">Expert (10+ years)</FieldLabel>
                  </div>
                </RadioGroup>
                <FieldDescription>How many years of experience do you have?</FieldDescription>
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          />

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <FieldGroup>
                <Field orientation="responsive">
                  <Button type="submit">{isSubmitting ? "Submitting..." : "Submit"}</Button>
                  <Button type="button" variant="outline" onClick={() => form.reset()}>
                    Clear
                  </Button>
                </Field>
              </FieldGroup>
            )}
          />
        </form>
      </CardContent>
    </Card>
  );
}
