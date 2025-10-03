"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";

export default function InputForm() {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Input form submitted:", value);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Input Fields Example</CardTitle>
        <CardDescription>Basic input fields with validation and error handling.</CardDescription>
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
            name="firstName"
            validators={{
              onBlur: ({ value }) =>
                !value
                  ? "A first name is required"
                  : value.length < 3
                    ? "First name must be at least 3 characters"
                    : undefined,
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
                <FieldDescription>Your first name as it appears on official documents.</FieldDescription>
                {field.state.meta.isTouched && !field.state.meta.isValid && (
                  <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                )}
              </Field>
            )}
          />

          <form.Field
            name="lastName"
            validators={{
              onBlur: ({ value }) =>
                !value
                  ? "A last name is required"
                  : value.length < 2
                    ? "Last name must be at least 2 characters"
                    : undefined,
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
                <FieldDescription>Your last name as it appears on official documents.</FieldDescription>
                {field.state.meta.isTouched && !field.state.meta.isValid && (
                  <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                )}
              </Field>
            )}
          />

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
            name="username"
            validators={{
              onBlur: ({ value }) => {
                if (!value) return "Username is required";
                if (value.length < 3) return "Username must be at least 3 characters";
                if (!/^[a-zA-Z0-9_]+$/.test(value))
                  return "Username can only contain letters, numbers, and underscores";
                return undefined;
              },
            }}
            children={(field) => (
              <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                  placeholder="Choose a username"
                />
                <FieldDescription>This will be your unique identifier on our platform.</FieldDescription>
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
