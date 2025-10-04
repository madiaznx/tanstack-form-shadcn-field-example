"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { formatFormError } from "@/utils/format-form-error";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

export default function InputForm() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
    onSubmit: async ({ value }) => {
      toast.success("Login successful!", {
        description: `Email: ${value.email}, Remember: ${value.remember ? "Yes" : "No"}`,
      });
      form.reset();
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Enter your credentials to access your account securely.</CardDescription>
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
            name="email"
            validators={{
              onBlur: ({ value }) => {
                if (!value) return "Email is required";
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return !emailRegex.test(value) ? "Please enter a valid email address" : undefined;
              },
            }}
            children={(field) => (
              <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                  placeholder="m@example.com"
                />
                <FieldError errors={formatFormError(field.state.meta.errors)} />
              </Field>
            )}
          />

          <form.Field
            name="password"
            validators={{
              onBlur: ({ value }) => (!value ? "Password is required" : undefined),
            }}
            children={(field) => (
              <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <a href="#" className="text-primary text-sm underline">
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                  placeholder="password"
                />
                <FieldError errors={formatFormError(field.state.meta.errors)} />
              </Field>
            )}
          />

          <form.Field
            name="remember"
            children={(field) => (
              <Field>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={field.name}
                    checked={field.state.value}
                    onCheckedChange={(checked) => field.handleChange(checked === true)}
                  />
                  <FieldLabel htmlFor={field.name}>Remember me</FieldLabel>
                </div>
              </Field>
            )}
          />

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" className="w-full">
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            )}
          />
        </form>
      </CardContent>
    </Card>
  );
}
