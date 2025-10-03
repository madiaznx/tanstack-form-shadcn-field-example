"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "@tanstack/react-form";

export default function RadioForm() {
  const form = useForm({
    defaultValues: {
      theme: "",
      plan: "",
      experience: "",
      size: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Radio form submitted:", value);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Radio Fields Example</CardTitle>
        <CardDescription>Single choice selections using radio button groups.</CardDescription>
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
            name="theme"
            validators={{
              onChange: ({ value }) => (!value ? "Please select a theme" : undefined),
            }}
            children={(field) => (
              <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                <FieldLabel>Theme Preference</FieldLabel>
                <RadioGroup
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value)}
                  className="grid grid-cols-3 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="light" />
                    <FieldLabel htmlFor="light">Light</FieldLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="dark" />
                    <FieldLabel htmlFor="dark">Dark</FieldLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="system" />
                    <FieldLabel htmlFor="system">System</FieldLabel>
                  </div>
                </RadioGroup>
                <FieldDescription>Choose how the interface should look.</FieldDescription>
                {field.state.meta.isTouched && !field.state.meta.isValid && (
                  <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                )}
              </Field>
            )}
          />

          <form.Field
            name="plan"
            validators={{
              onChange: ({ value }) => (!value ? "Please select a plan" : undefined),
            }}
            children={(field) => (
              <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                <FieldLabel>Subscription Plan</FieldLabel>
                <RadioGroup
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="free" id="free" />
                    <div className="grid gap-1.5 leading-none">
                      <FieldLabel htmlFor="free">Free Plan</FieldLabel>
                      <FieldDescription>$0/month - Basic features</FieldDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pro" id="pro" />
                    <div className="grid gap-1.5 leading-none">
                      <FieldLabel htmlFor="pro">Pro Plan</FieldLabel>
                      <FieldDescription>$19/month - Advanced features</FieldDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="enterprise" id="enterprise" />
                    <div className="grid gap-1.5 leading-none">
                      <FieldLabel htmlFor="enterprise">Enterprise Plan</FieldLabel>
                      <FieldDescription>$99/month - Full features</FieldDescription>
                    </div>
                  </div>
                </RadioGroup>
                <FieldDescription>Choose the plan that best fits your needs.</FieldDescription>
                {field.state.meta.isTouched && !field.state.meta.isValid && (
                  <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                )}
              </Field>
            )}
          />

          <form.Field
            name="experience"
            children={(field) => (
              <Field>
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
              </Field>
            )}
          />

          <form.Field
            name="size"
            children={(field) => (
              <Field>
                <FieldLabel>Company Size</FieldLabel>
                <RadioGroup
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value)}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="startup" id="startup" />
                    <FieldLabel htmlFor="startup">Startup (1-10)</FieldLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="small" id="small" />
                    <FieldLabel htmlFor="small">Small (11-50)</FieldLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <FieldLabel htmlFor="medium">Medium (51-200)</FieldLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="large" id="large" />
                    <FieldLabel htmlFor="large">Large (200+)</FieldLabel>
                  </div>
                </RadioGroup>
                <FieldDescription>What's the size of your company?</FieldDescription>
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
