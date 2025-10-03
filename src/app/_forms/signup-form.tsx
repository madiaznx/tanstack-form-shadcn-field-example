"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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

export default function SignupForm() {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      terms: false,
      newsletter: false,
    },
    onSubmit: async ({ value }) => {
      console.log("Signup form submitted:", value);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create your account to get started with our platform.</CardDescription>
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
          <FieldSet>
            <FieldLegend>Account Information</FieldLegend>
            <FieldDescription>Please provide your basic information to create your account.</FieldDescription>

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
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldLegend>Security</FieldLegend>
            <FieldDescription>Create a secure password for your account.</FieldDescription>

            <FieldGroup>
              <form.Field
                name="password"
                validators={{
                  onBlur: ({ value }) => {
                    if (!value) return "Password is required";
                    if (value.length < 8) return "Password must be at least 8 characters";
                    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value))
                      return "Password must contain at least one uppercase letter, one lowercase letter, and one number";
                    return undefined;
                  },
                }}
                children={(field) => (
                  <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                      placeholder="Create a password"
                    />
                    <FieldDescription>
                      Must be at least 8 characters with uppercase, lowercase, and number.
                    </FieldDescription>
                    {field.state.meta.isTouched && !field.state.meta.isValid && (
                      <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                    )}
                  </Field>
                )}
              />

              <form.Field
                name="confirmPassword"
                validators={{
                  onBlur: ({ value }) => {
                    if (!value) return "Please confirm your password";
                    if (value !== form.getFieldValue("password")) return "Passwords do not match";
                    return undefined;
                  },
                }}
                children={(field) => (
                  <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                    <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                      placeholder="Confirm your password"
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
            <FieldLegend>Preferences</FieldLegend>
            <FieldDescription>Choose your communication preferences.</FieldDescription>

            <FieldGroup>
              <form.Field
                name="newsletter"
                children={(field) => (
                  <Field>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={field.name}
                        checked={field.state.value}
                        onCheckedChange={(checked) => field.handleChange(checked === true)}
                      />
                      <FieldLabel htmlFor={field.name}>Subscribe to Newsletter</FieldLabel>
                    </div>
                    <FieldDescription>Stay updated with our latest news and offers.</FieldDescription>
                  </Field>
                )}
              />

              <form.Field
                name="terms"
                validators={{
                  onChange: ({ value }) => (!value ? "You must accept the terms and conditions" : undefined),
                }}
                children={(field) => (
                  <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={field.name}
                        checked={field.state.value}
                        onCheckedChange={(checked) => field.handleChange(checked === true)}
                      />
                      <FieldLabel htmlFor={field.name}>
                        I agree to the{" "}
                        <a href="#" className="text-primary underline">
                          Terms and Conditions
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-primary underline">
                          Privacy Policy
                        </a>
                      </FieldLabel>
                    </div>
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
              <Button type="submit" disabled={!canSubmit} className="w-full">
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </Button>
            )}
          />
        </form>
      </CardContent>
    </Card>
  );
}
