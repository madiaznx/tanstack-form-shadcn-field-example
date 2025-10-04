"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { revalidateLogic, useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

const switchFormSchema = z.object({
  newsletter: z.boolean(),
  notifications: z.boolean(),
  analytics: z.boolean(),
  marketing: z.boolean(),
});

type SwitchFormData = z.infer<typeof switchFormSchema>;

const defaultValues: SwitchFormData = {
  newsletter: false,
  notifications: false,
  analytics: false,
  marketing: false,
};

export default function SwitchForm() {
  const form = useForm({
    defaultValues: defaultValues,
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: switchFormSchema,
      onSubmitAsync: async ({ value }) => {
        const enabledSettings = Object.entries(value)
          .filter(([_, enabled]) => enabled)
          .map(([key, _]) => key);

        toast.success("Privacy settings saved!", {
          description: `Enabled: ${enabledSettings.join(", ") || "None"}`,
        });
        form.reset();
      },
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy Settings</CardTitle>
        <CardDescription>Control your privacy preferences and communication settings.</CardDescription>
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
