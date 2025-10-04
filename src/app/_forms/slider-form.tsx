"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";
import { revalidateLogic, useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

const sliderFormSchema = z.object({
  budget: z.array(z.number()).min(1, "Budget must have at least one value"),
});

type SliderFormData = z.infer<typeof sliderFormSchema>;

const defaultValues: SliderFormData = {
  budget: [50],
};

export default function SliderForm() {
  const form = useForm({
    defaultValues: defaultValues,
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: sliderFormSchema,
      onSubmitAsync: async ({ value }) => {
        toast.success("Budget configuration saved!", {
          description: `Budget: $${value.budget[0]}`,
        });
        form.reset();
      },
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Configuration</CardTitle>
        <CardDescription>Set your spending limit using the interactive slider below.</CardDescription>
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
            name="budget"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Budget</FieldLabel>
                <Slider
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value)}
                  max={1000}
                  min={0}
                  step={50}
                  className="w-full"
                />
                <FieldDescription>Current budget: ${field.state.value[0]}</FieldDescription>
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
