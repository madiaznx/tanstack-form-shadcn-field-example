"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

export default function FieldGroupForm() {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
    },
    onSubmit: async ({ value }) => {
      toast.success("Contact information saved!", {
        description: `${value.firstName} ${value.lastName} - ${value.email}`,
      });
      form.reset();
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>Complete your personal details and contact information for account setup.</CardDescription>
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
            <FieldGroup className="@container/field-group flex flex-col gap-6 md:flex-row md:gap-4">
              <form.Field
                name="firstName"
                validators={{
                  onBlur: ({ value }) => (!value ? "First name is required" : undefined),
                }}
                children={(field) => (
                  <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid} className="flex-1">
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
                  <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid} className="flex-1">
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
            <FieldLegend>Contact Details</FieldLegend>
            <FieldGroup className="@container/field-group flex flex-col gap-6 md:flex-row md:gap-4">
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
                  <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid} className="flex-1">
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
                    {field.state.meta.isTouched && !field.state.meta.isValid && (
                      <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                    )}
                  </Field>
                )}
              />

              <form.Field
                name="phone"
                validators={{
                  onBlur: ({ value }) => (!value ? "Phone number is required" : undefined),
                  onMount: ({ value }) => (!value ? "Phone number is required" : undefined),
                }}
                children={(field) => (
                  <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid} className="flex-1">
                    <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="tel"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                      placeholder="Enter your phone number"
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
            <FieldLegend>Address Information</FieldLegend>
            <FieldGroup className="@container/field-group flex flex-col gap-6 md:flex-row md:gap-4">
              <form.Field
                name="address"
                validators={{
                  onBlur: ({ value }) => (!value ? "Street address is required" : undefined),
                  onMount: ({ value }) => (!value ? "Street address is required" : undefined),
                }}
                children={(field) => (
                  <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid} className="flex-1">
                    <FieldLabel htmlFor={field.name}>Street Address</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                      placeholder="Enter your street address"
                    />
                    {field.state.meta.isTouched && !field.state.meta.isValid && (
                      <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                    )}
                  </Field>
                )}
              />

              <form.Field
                name="city"
                validators={{
                  onBlur: ({ value }) => (!value ? "City is required" : undefined),
                  onMount: ({ value }) => (!value ? "City is required" : undefined),
                }}
                children={(field) => (
                  <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid} className="flex-1">
                    <FieldLabel htmlFor={field.name}>City</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                      placeholder="Enter your city"
                    />
                    {field.state.meta.isTouched && !field.state.meta.isValid && (
                      <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>

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
