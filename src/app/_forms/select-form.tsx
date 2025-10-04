"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { revalidateLogic, useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

const selectFormSchema = z.object({
  country: z.string().min(1, "Please select a country"),
});

type SelectFormData = z.infer<typeof selectFormSchema>;

const defaultValues: SelectFormData = {
  country: "",
};

export default function SelectForm() {
  const form = useForm({
    defaultValues: defaultValues,
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: selectFormSchema,
      onSubmitAsync: async ({ value }) => {
        const countryNames: Record<string, string> = {
          in: "India",
          us: "United States",
          ca: "Canada",
          uk: "United Kingdom",
          au: "Australia",
          de: "Germany",
          fr: "France",
          jp: "Japan",
          br: "Brazil",
        };
        toast.success("Location settings saved!", {
          description: `Country: ${countryNames[value.country] || value.country}`,
        });
        form.reset();
      },
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Location Settings</CardTitle>
        <CardDescription>Select your country to customize content and services for your region.</CardDescription>
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
            name="country"
            children={(field) => (
              <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                <FieldLabel htmlFor={field.name}>Country</FieldLabel>
                <Select value={field.state.value} onValueChange={(value) => field.handleChange(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in">India</SelectItem>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                    <SelectItem value="fr">France</SelectItem>
                    <SelectItem value="jp">Japan</SelectItem>
                    <SelectItem value="br">Brazil</SelectItem>
                  </SelectContent>
                </Select>
                <FieldDescription>Select your country of residence.</FieldDescription>
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
