"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

export default function CheckboxForm() {
  const form = useForm({
    defaultValues: {
      notifications: [] as string[],
    },
    onSubmit: async ({ value }) => {
      toast.success("Notification preferences saved!", {
        description: `Selected: ${value.notifications.join(", ") || "None"}`,
      });
      form.reset();
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Customize how you receive updates and communications from our platform.</CardDescription>
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
        </form>
      </CardContent>
    </Card>
  );
}
