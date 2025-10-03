"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";

export default function ResponsiveForm() {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zipCode: "",
      country: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Responsive form submitted:", value);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Responsive Layout Example</CardTitle>
        <CardDescription>Fields that adapt to different screen sizes using responsive orientation.</CardDescription>
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
            <FieldDescription>These fields adapt to different screen sizes.</FieldDescription>

            <FieldGroup className="@container/field-group">
              <form.Field
                name="firstName"
                validators={{
                  onBlur: ({ value }) => (!value ? "First name is required" : undefined),
                }}
                children={(field) => (
                  <Field
                    orientation="responsive"
                    data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                  >
                    <FieldLabel htmlFor={field.name}>First Name</FieldLabel>
                    <FieldContent>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                        placeholder="Enter your first name"
                      />
                      <FieldDescription>
                        This field switches between vertical and horizontal layouts based on screen size.
                      </FieldDescription>
                    </FieldContent>
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
                  <Field
                    orientation="responsive"
                    data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                  >
                    <FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
                    <FieldContent>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                        placeholder="Enter your last name"
                      />
                      <FieldDescription>Notice how the layout changes on different screen sizes.</FieldDescription>
                    </FieldContent>
                    {field.state.meta.isTouched && !field.state.meta.isValid && (
                      <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>

          <FieldSeparator>Contact Information</FieldSeparator>

          <FieldGroup className="@container/field-group">
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
                <Field orientation="responsive" data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                  <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                  <FieldContent>
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
                  </FieldContent>
                  {field.state.meta.isTouched && !field.state.meta.isValid && (
                    <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                  )}
                </Field>
              )}
            />

            <form.Field
              name="phone"
              children={(field) => (
                <Field orientation="responsive">
                  <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                  <FieldContent>
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
                  </FieldContent>
                </Field>
              )}
            />
          </FieldGroup>

          <FieldSeparator>Address Information</FieldSeparator>

          <FieldGroup className="@container/field-group">
            <form.Field
              name="address"
              children={(field) => (
                <Field orientation="responsive">
                  <FieldLabel htmlFor={field.name}>Street Address</FieldLabel>
                  <FieldContent>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your street address"
                    />
                    <FieldDescription>Your complete street address.</FieldDescription>
                  </FieldContent>
                </Field>
              )}
            />

            <form.Field
              name="city"
              children={(field) => (
                <Field orientation="responsive">
                  <FieldLabel htmlFor={field.name}>City</FieldLabel>
                  <FieldContent>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your city"
                    />
                    <FieldDescription>The city where you reside.</FieldDescription>
                  </FieldContent>
                </Field>
              )}
            />

            <form.Field
              name="zipCode"
              children={(field) => (
                <Field orientation="responsive">
                  <FieldLabel htmlFor={field.name}>ZIP Code</FieldLabel>
                  <FieldContent>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your ZIP code"
                    />
                    <FieldDescription>Your postal/ZIP code.</FieldDescription>
                  </FieldContent>
                </Field>
              )}
            />

            <form.Field
              name="country"
              children={(field) => (
                <Field orientation="responsive">
                  <FieldLabel htmlFor={field.name}>Country</FieldLabel>
                  <FieldContent>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your country"
                    />
                    <FieldDescription>Your country of residence.</FieldDescription>
                  </FieldContent>
                </Field>
              )}
            />
          </FieldGroup>

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
