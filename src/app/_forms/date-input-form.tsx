"use client";

import { DateInputField, formatDateWithTime } from "@/components/date-input-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { revalidateLogic, useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

export const isoDateTimeSchema = z.union([
  z.iso.datetime({
    offset: true,
    error: "Please enter a valid date and time with timezone",
  }),
  z.iso.datetime({ local: true, error: "Please enter a valid date and time" }), // Local datetime without timezone
]);

export const isoDateSchema = z.iso.date({
  error: "Please enter a valid date (YYYY-MM-DD format)",
});

// Optional date/time schema that accepts empty strings
export const optionalDateTimeSchema = z
  .union([isoDateTimeSchema, isoDateSchema, z.literal(""), z.undefined()])
  .optional()
  .transform((val) => {
    if (val === null || val === "" || val === undefined) return undefined;
    return val;
  });

const dateFormSchema = z.object({
  name: z.string().min(1).max(50),
  date: optionalDateTimeSchema,
});

const defaultValues: z.input<typeof dateFormSchema> = {
  name: "",
  date: "",
};

export default function DateInputForm() {
  const form = useForm({
    defaultValues: defaultValues,
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: dateFormSchema,
      onSubmitAsync: async ({ value }) => {
        toast.success("User submitted successfully!", {
          description: `Name: ${value.name}, Date: ${value.date ? formatDateWithTime(new Date(value.date).getTime()) : "None"}`,
        });
        form.reset();
      },
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Date Input Form</CardTitle>
        <CardDescription>Enter a your name and birth date to submit the form.</CardDescription>
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
            name="name"
            children={(field) => (
              <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                  placeholder="m@example.com"
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          />

          <form.Field
            name="date"
            children={(field) => (
              <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                <DateInputField
                  id={field.name}
                  required={false}
                  label="Date"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e)}
                  placeholder="YYYY-MM-DD HH:MM"
                  showTime
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          />

          <form.Subscribe
            selector={(state) => [state.isSubmitting]}
            children={([isSubmitting]) => (
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
