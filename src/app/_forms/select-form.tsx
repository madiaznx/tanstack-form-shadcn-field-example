"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "@tanstack/react-form";

export default function SelectForm() {
  const form = useForm({
    defaultValues: {
      country: "",
      plan: "",
      department: "",
      experience: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Select form submitted:", value);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Fields Example</CardTitle>
        <CardDescription>Dropdown selection fields with various options and validation.</CardDescription>
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
            name="country"
            validators={{
              onBlur: ({ value }) => (!value ? "Please select a country" : undefined),
            }}
            children={(field) => (
              <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                <FieldLabel htmlFor={field.name}>Country</FieldLabel>
                <Select value={field.state.value} onValueChange={(value) => field.handleChange(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                    <SelectItem value="fr">France</SelectItem>
                    <SelectItem value="jp">Japan</SelectItem>
                    <SelectItem value="br">Brazil</SelectItem>
                  </SelectContent>
                </Select>
                <FieldDescription>Select your country of residence.</FieldDescription>
                {field.state.meta.isTouched && !field.state.meta.isValid && (
                  <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                )}
              </Field>
            )}
          />

          <form.Field
            name="plan"
            validators={{
              onBlur: ({ value }) => (!value ? "Please select a plan" : undefined),
            }}
            children={(field) => (
              <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                <FieldLabel htmlFor={field.name}>Subscription Plan</FieldLabel>
                <Select value={field.state.value} onValueChange={(value) => field.handleChange(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Free - $0/month</SelectItem>
                    <SelectItem value="basic">Basic - $9/month</SelectItem>
                    <SelectItem value="pro">Pro - $19/month</SelectItem>
                    <SelectItem value="enterprise">Enterprise - $99/month</SelectItem>
                  </SelectContent>
                </Select>
                <FieldDescription>Choose the plan that best fits your needs.</FieldDescription>
                {field.state.meta.isTouched && !field.state.meta.isValid && (
                  <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                )}
              </Field>
            )}
          />

          <form.Field
            name="department"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Department</FieldLabel>
                <Select value={field.state.value} onValueChange={(value) => field.handleChange(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="support">Customer Support</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FieldDescription>Which department do you work in?</FieldDescription>
              </Field>
            )}
          />

          <form.Field
            name="experience"
            validators={{
              onBlur: ({ value }) => (!value ? "Please select your experience level" : undefined),
            }}
            children={(field) => (
              <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                <FieldLabel htmlFor={field.name}>Experience Level</FieldLabel>
                <Select value={field.state.value} onValueChange={(value) => field.handleChange(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                    <SelectItem value="advanced">Advanced (6-10 years)</SelectItem>
                    <SelectItem value="expert">Expert (10+ years)</SelectItem>
                  </SelectContent>
                </Select>
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
