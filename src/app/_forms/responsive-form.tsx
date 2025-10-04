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
import { revalidateLogic, useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

const responsiveFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  message: z.string().min(1, "Message is required"),
});

type ResponsiveFormData = z.infer<typeof responsiveFormSchema>;

const defaultValues: ResponsiveFormData = {
  name: "",
  message: "",
};

export default function ResponsiveForm() {
  const form = useForm({
    defaultValues: defaultValues,
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: responsiveFormSchema,
      onSubmitAsync: async ({ value }) => {
        toast.success("Message sent successfully!", {
          description: `From: ${value.name}`,
        });
        form.reset();
      },
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
                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                />
                <FieldSeparator />
                <form.Field
                  name="message"
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
                      <FieldError errors={field.state.meta.errors} />
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
