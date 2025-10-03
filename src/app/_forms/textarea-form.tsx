"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";

export default function TextareaForm() {
  const form = useForm({
    defaultValues: {
      bio: "",
      message: "",
      feedback: "",
      description: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Textarea form submitted:", value);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Textarea Fields Example</CardTitle>
        <CardDescription>Multi-line text input fields with character limits and validation.</CardDescription>
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
            name="bio"
            validators={{
              onBlur: ({ value }) => (value && value.length > 500 ? "Bio must be less than 500 characters" : undefined),
            }}
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
                {field.state.meta.isTouched && !field.state.meta.isValid && (
                  <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                )}
              </Field>
            )}
          />

          <form.Field
            name="message"
            validators={{
              onBlur: ({ value }) =>
                !value
                  ? "Message is required"
                  : value.length < 10
                    ? "Message must be at least 10 characters"
                    : undefined,
            }}
            children={(field) => (
              <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                <FieldLabel htmlFor={field.name}>Message</FieldLabel>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                  placeholder="Write your message here..."
                  className="min-h-32"
                />
                <FieldDescription>
                  Please provide a detailed message. ({field.state.value.length} characters)
                </FieldDescription>
                {field.state.meta.isTouched && !field.state.meta.isValid && (
                  <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                )}
              </Field>
            )}
          />

          <form.Field
            name="feedback"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Feedback</FieldLabel>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Share your feedback with us..."
                  className="min-h-20"
                />
                <FieldDescription>Your feedback helps us improve our service. (Optional)</FieldDescription>
              </Field>
            )}
          />

          <form.Field
            name="description"
            validators={{
              onBlur: ({ value }) =>
                value && value.length > 1000 ? "Description must be less than 1000 characters" : undefined,
            }}
            children={(field) => (
              <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                <FieldLabel htmlFor={field.name}>Project Description</FieldLabel>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                  placeholder="Describe your project in detail..."
                  className="min-h-40"
                />
                <FieldDescription>
                  Provide a comprehensive description of your project. ({field.state.value.length}/1000 characters)
                </FieldDescription>
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
