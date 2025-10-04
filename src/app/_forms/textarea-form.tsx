"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { revalidateLogic, useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

const textareaFormSchema = z.object({
  about: z.string().min(1, "About section is required").max(500, "About section must be less than 500 characters"),
});

type TextareaFormData = z.infer<typeof textareaFormSchema>;

const defaultValues: TextareaFormData = {
  about: "",
};

export default function TextareaForm() {
  const form = useForm({
    defaultValues: defaultValues,
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: textareaFormSchema,
      onSubmitAsync: async ({ value }) => {
        toast.success("Form submitted successfully!", {
          description: `About: ${value.about}`,
        });
        form.reset();
      },
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Tell us about yourself to help personalize your experience.</CardDescription>
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
            name="about"
            children={(field) => (
              <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                <FieldLabel htmlFor={field.name}>About You</FieldLabel>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                  placeholder="Tell us about yourself..."
                  className="min-h-24"
                />
                <FieldDescription>
                  Share your background, interests, or anything you'd like us to know. ({field.state.value.length}/500
                  characters)
                </FieldDescription>
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          />

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
