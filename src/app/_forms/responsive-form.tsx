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
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

export default function ResponsiveForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      message: "",
    },
    onSubmit: async ({ value }) => {
      toast.success("Message sent successfully!", {
        description: `From: ${value.name}`,
      });
      form.reset();
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
        <CardDescription>Send us a message and we'll get back to you as soon as possible.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full max-w-4xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <FieldSet>
              <FieldLegend>Profile</FieldLegend>
              <FieldDescription>Fill in your profile information.</FieldDescription>
              <FieldSeparator />
              <FieldGroup>
                <form.Field
                  name="name"
                  validators={{
                    onBlur: ({ value }) => (!value ? "Name is required" : undefined),
                  }}
                  children={(field) => (
                    <Field
                      orientation="responsive"
                      data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                    >
                      <FieldContent>
                        <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                        <FieldDescription>Provide your full name for identification</FieldDescription>
                      </FieldContent>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                        placeholder="Evil Rabbit"
                        required
                      />
                      {field.state.meta.isTouched && !field.state.meta.isValid && (
                        <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                      )}
                    </Field>
                  )}
                />
                <FieldSeparator />
                <form.Field
                  name="message"
                  validators={{
                    onBlur: ({ value }) => (!value ? "Message is required" : undefined),
                  }}
                  children={(field) => (
                    <Field
                      orientation="responsive"
                      data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                    >
                      <FieldContent>
                        <FieldLabel htmlFor={field.name}>Message</FieldLabel>
                        <FieldDescription>
                          You can write your message here. Keep it short, preferably under 100 characters.
                        </FieldDescription>
                      </FieldContent>
                      <Textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                        placeholder="Hello, world!"
                        required
                        className="min-h-[100px] resize-none sm:min-w-[300px]"
                      />
                      {field.state.meta.isTouched && !field.state.meta.isValid && (
                        <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                      )}
                    </Field>
                  )}
                />
                <FieldSeparator />
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                  children={([canSubmit, isSubmitting]) => (
                    <Field orientation="responsive">
                      <Button type="submit">{isSubmitting ? "Submitting..." : "Submit"}</Button>
                      <Button type="button" variant="outline" onClick={() => form.reset()}>
                        Clear
                      </Button>
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
