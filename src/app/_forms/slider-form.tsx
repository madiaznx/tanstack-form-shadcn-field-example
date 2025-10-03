"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";
import { useForm } from "@tanstack/react-form";

export default function SliderForm() {
  const form = useForm({
    defaultValues: {
      budget: [50],
      volume: [75],
      temperature: [20],
      rating: [3],
    },
    onSubmit: async ({ value }) => {
      console.log("Slider form submitted:", value);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Slider Fields Example</CardTitle>
        <CardDescription>Range sliders for numeric input with visual feedback.</CardDescription>
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
                <FieldLabel htmlFor={field.name}>Monthly Budget</FieldLabel>
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

          <form.Field
            name="volume"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Volume Level</FieldLabel>
                <Slider
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value)}
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                />
                <FieldDescription>Volume: {field.state.value[0]}%</FieldDescription>
              </Field>
            )}
          />

          <form.Field
            name="temperature"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Temperature</FieldLabel>
                <Slider
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value)}
                  max={40}
                  min={-10}
                  step={1}
                  className="w-full"
                />
                <FieldDescription>Temperature: {field.state.value[0]}°C</FieldDescription>
              </Field>
            )}
          />

          <form.Field
            name="rating"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Rating</FieldLabel>
                <Slider
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value)}
                  max={5}
                  min={1}
                  step={0.5}
                  className="w-full"
                />
                <FieldDescription>Rating: {field.state.value[0]}/5 stars</FieldDescription>
              </Field>
            )}
          />

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit} className="w-full">
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            )}
          />
        </form>
      </CardContent>
    </Card>
  );
}
