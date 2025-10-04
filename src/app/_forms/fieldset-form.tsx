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
import { revalidateLogic, useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

const fieldsetFormSchema = z.object({
  streetAddress: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal code is required"),
});

type FieldsetFormData = z.infer<typeof fieldsetFormSchema>;

const defaultValues: FieldsetFormData = {
  streetAddress: "",
  city: "",
  postalCode: "",
};

export default function FieldsetForm() {
  const form = useForm({
    defaultValues: defaultValues,
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: fieldsetFormSchema,
      onSubmitAsync: async ({ value }) => {
        toast.success("Shipping address saved!", {
          description: `${value.streetAddress}, ${value.city} ${value.postalCode}`,
        });
        form.reset();
      },
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Address</CardTitle>
        <CardDescription>Provide your delivery address for order processing and shipping.</CardDescription>
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
            <FieldLegend>Address Information</FieldLegend>
            <FieldDescription>We need your address to deliver your order.</FieldDescription>

            <FieldGroup>
              <form.Field
                name="streetAddress"
                children={(field) => (
                  <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                    <FieldLabel htmlFor={field.name}>Street Address</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                      placeholder="123 Main St"
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <form.Field
                  name="city"
                  children={(field) => (
                    <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                      <FieldLabel htmlFor={field.name}>City</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                        placeholder="New York"
                      />
                      {field.state.meta.isTouched && !field.state.meta.isValid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )}
                />

                <form.Field
                  name="postalCode"
                  children={(field) => (
                    <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                      <FieldLabel htmlFor={field.name}>Postal Code</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                        placeholder="90502"
                      />
                      {field.state.meta.isTouched && !field.state.meta.isValid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )}
                />
              </div>
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
