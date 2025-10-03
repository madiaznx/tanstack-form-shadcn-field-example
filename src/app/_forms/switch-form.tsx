"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { useForm } from "@tanstack/react-form";

export default function SwitchForm() {
  const form = useForm({
    defaultValues: {
      newsletter: false,
      notifications: false,
      darkMode: false,
      autoSave: true,
      analytics: false,
      marketing: false,
    },
    onSubmit: async ({ value }) => {
      console.log("Switch form submitted:", value);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Switch Fields Example</CardTitle>
        <CardDescription>Toggle switches for boolean settings and preferences.</CardDescription>
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
            name="newsletter"
            children={(field) => (
              <Field orientation="horizontal">
                <Switch
                  id={field.name}
                  checked={field.state.value}
                  onCheckedChange={(checked) => field.handleChange(checked === true)}
                />
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Newsletter</FieldLabel>
                  <FieldDescription>Receive our weekly newsletter with updates and tips.</FieldDescription>
                </FieldContent>
              </Field>
            )}
          />

          <form.Field
            name="notifications"
            children={(field) => (
              <Field orientation="horizontal">
                <Switch
                  id={field.name}
                  checked={field.state.value}
                  onCheckedChange={(checked) => field.handleChange(checked === true)}
                />
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Push Notifications</FieldLabel>
                  <FieldDescription>Get notified about important updates and messages.</FieldDescription>
                </FieldContent>
              </Field>
            )}
          />

          <form.Field
            name="darkMode"
            children={(field) => (
              <Field orientation="horizontal">
                <Switch
                  id={field.name}
                  checked={field.state.value}
                  onCheckedChange={(checked) => field.handleChange(checked === true)}
                />
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Dark Mode</FieldLabel>
                  <FieldDescription>Switch to dark theme for better viewing in low light.</FieldDescription>
                </FieldContent>
              </Field>
            )}
          />

          <form.Field
            name="autoSave"
            children={(field) => (
              <Field orientation="horizontal">
                <Switch
                  id={field.name}
                  checked={field.state.value}
                  onCheckedChange={(checked) => field.handleChange(checked === true)}
                />
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Auto Save</FieldLabel>
                  <FieldDescription>Automatically save your work as you type.</FieldDescription>
                </FieldContent>
              </Field>
            )}
          />

          <form.Field
            name="analytics"
            children={(field) => (
              <Field orientation="horizontal">
                <Switch
                  id={field.name}
                  checked={field.state.value}
                  onCheckedChange={(checked) => field.handleChange(checked === true)}
                />
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Analytics</FieldLabel>
                  <FieldDescription>Help us improve by sharing anonymous usage data.</FieldDescription>
                </FieldContent>
              </Field>
            )}
          />

          <form.Field
            name="marketing"
            children={(field) => (
              <Field orientation="horizontal">
                <Switch
                  id={field.name}
                  checked={field.state.value}
                  onCheckedChange={(checked) => field.handleChange(checked === true)}
                />
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Marketing Communications</FieldLabel>
                  <FieldDescription>Receive promotional emails and special offers.</FieldDescription>
                </FieldContent>
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
