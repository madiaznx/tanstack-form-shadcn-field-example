"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { useForm } from "@tanstack/react-form";

export default function CheckboxForm() {
  const form = useForm({
    defaultValues: {
      interests: [] as string[],
      notifications: [] as string[],
      terms: false,
      newsletter: false,
    },
    onSubmit: async ({ value }) => {
      console.log("Checkbox form submitted:", value);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Checkbox Fields Example</CardTitle>
        <CardDescription>Multiple choice selections and boolean toggles using checkboxes.</CardDescription>
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
            name="interests"
            children={(field) => (
              <Field>
                <FieldLabel>Topics of Interest</FieldLabel>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: "tech", label: "Technology" },
                    { id: "design", label: "Design" },
                    { id: "business", label: "Business" },
                    { id: "science", label: "Science" },
                    { id: "art", label: "Art" },
                    { id: "sports", label: "Sports" },
                  ].map((topic) => (
                    <div key={topic.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={topic.id}
                        checked={field.state.value.includes(topic.id)}
                        onCheckedChange={(checked) => {
                          const current = field.state.value;
                          if (checked) {
                            field.handleChange([...current, topic.id]);
                          } else {
                            field.handleChange(current.filter((item) => item !== topic.id));
                          }
                        }}
                      />
                      <FieldLabel htmlFor={topic.id}>{topic.label}</FieldLabel>
                    </div>
                  ))}
                </div>
                <FieldDescription>Select all topics that interest you.</FieldDescription>
              </Field>
            )}
          />

          <form.Field
            name="notifications"
            children={(field) => (
              <Field>
                <FieldLabel>Notification Preferences</FieldLabel>
                <div className="space-y-3">
                  {[
                    { id: "email", label: "Email notifications", description: "Receive updates via email" },
                    { id: "sms", label: "SMS notifications", description: "Get text message alerts" },
                    { id: "push", label: "Push notifications", description: "Browser and mobile push notifications" },
                    { id: "marketing", label: "Marketing emails", description: "Promotional content and offers" },
                  ].map((pref) => (
                    <div key={pref.id} className="flex items-start space-x-2">
                      <Checkbox
                        id={pref.id}
                        checked={field.state.value.includes(pref.id)}
                        onCheckedChange={(checked) => {
                          const current = field.state.value;
                          if (checked) {
                            field.handleChange([...current, pref.id]);
                          } else {
                            field.handleChange(current.filter((item) => item !== pref.id));
                          }
                        }}
                        className="mt-1"
                      />
                      <div className="grid gap-1.5 leading-none">
                        <FieldLabel htmlFor={pref.id}>{pref.label}</FieldLabel>
                        <FieldDescription>{pref.description}</FieldDescription>
                      </div>
                    </div>
                  ))}
                </div>
                <FieldDescription>Choose how you'd like to be notified.</FieldDescription>
              </Field>
            )}
          />

          <form.Field
            name="newsletter"
            validators={{
              onChange: ({ value }) => (!value ? "You must subscribe to our newsletter" : undefined),
            }}
            children={(field) => (
              <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={field.name}
                    checked={field.state.value}
                    onCheckedChange={(checked) => field.handleChange(checked === true)}
                  />
                  <FieldLabel htmlFor={field.name}>Subscribe to Newsletter</FieldLabel>
                </div>
                <FieldDescription>Stay updated with our latest news and offers.</FieldDescription>
                {field.state.meta.isTouched && !field.state.meta.isValid && (
                  <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                )}
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
