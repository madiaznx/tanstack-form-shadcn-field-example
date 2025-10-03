"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

export default function RadioForm() {
  const form = useForm({
    defaultValues: {
      experience: "",
    },
    onSubmit: async ({ value }) => {
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
            validators={{
              onBlur: ({ value }) => (!value ? "Please select your experience level" : undefined),
              onMount: ({ value }) => (!value ? "Please select your experience level" : undefined),
            }}
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
                {field.state.meta.isTouched && !field.state.meta.isValid && (
                  <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                )}
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
