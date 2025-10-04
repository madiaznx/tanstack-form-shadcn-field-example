"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { revalidateLogic, useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

const fieldGroupFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Please enter a valid email address").min(1, "Email is required"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
});

type FieldGroupFormData = z.infer<typeof fieldGroupFormSchema>;

const defaultValues: FieldGroupFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
};

export default function FieldGroupForm() {
  const form = useForm({
    defaultValues: defaultValues,
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: fieldGroupFormSchema,
      onSubmitAsync: async ({ value }) => {
        toast.success("Contact information saved!", {
          description: `${value.firstName} ${value.lastName} - ${value.email}`,
        });
        form.reset();
      },
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
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <form.Field
                name="lastName"
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
                    <FieldError errors={field.state.meta.errors} />
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
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <form.Field
                name="phone"
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
                    <FieldError errors={field.state.meta.errors} />
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
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <form.Field
                name="city"
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
                    <FieldError errors={field.state.meta.errors} />
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
