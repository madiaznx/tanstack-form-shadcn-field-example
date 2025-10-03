"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";

export default function FieldsetForm() {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zipCode: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Fieldset form submitted:", value);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fieldset Example</CardTitle>
        <CardDescription>Grouped form fields using FieldSet and FieldLegend for semantic organization.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-8"
        >
          <FieldSet>
            <FieldLegend>Personal Information</FieldLegend>
            <FieldDescription>Please provide your basic personal details.</FieldDescription>

            <FieldGroup>
              <form.Field
                name="firstName"
                validators={{
                  onBlur: ({ value }) => (!value ? "First name is required" : undefined),
                }}
                children={(field) => (
                  <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                    <FieldLabel htmlFor={field.name}>First Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                      placeholder="Enter your first name"
                    />
                    {field.state.meta.isTouched && !field.state.meta.isValid && (
                      <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                    )}
                  </Field>
                )}
              />

              <form.Field
                name="lastName"
                validators={{
                  onBlur: ({ value }) => (!value ? "Last name is required" : undefined),
                }}
                children={(field) => (
                  <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                    <FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                      placeholder="Enter your last name"
                    />
                    {field.state.meta.isTouched && !field.state.meta.isValid && (
                      <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldLegend>Contact Information</FieldLegend>
            <FieldDescription>How can we reach you?</FieldDescription>

            <FieldGroup>
              <form.Field
                name="email"
                validators={{
                  onBlur: ({ value }) => {
                    if (!value) return "Email is required";
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return !emailRegex.test(value) ? "Please enter a valid email address" : undefined;
                  },
                }}
                children={(field) => (
                  <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                    <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                      placeholder="Enter your email address"
                    />
                    <FieldDescription>We'll use this to send you important updates.</FieldDescription>
                    {field.state.meta.isTouched && !field.state.meta.isValid && (
                      <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                    )}
                  </Field>
                )}
              />

              <form.Field
                name="phone"
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="tel"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your phone number"
                    />
                    <FieldDescription>Optional phone number for contact.</FieldDescription>
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldLegend variant="label">Address Information</FieldLegend>
            <FieldDescription>Where should we send your mail?</FieldDescription>

            <FieldGroup>
              <form.Field
                name="address"
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Street Address</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your street address"
                    />
                  </Field>
                )}
              />

              <form.Field
                name="city"
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>City</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your city"
                    />
                  </Field>
                )}
              />

              <form.Field
                name="zipCode"
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>ZIP Code</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your ZIP code"
                    />
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>

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
