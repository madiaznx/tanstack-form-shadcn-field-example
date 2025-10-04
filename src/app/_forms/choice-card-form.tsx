"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldTitle } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatFormError } from "@/utils/format-form-error";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

export default function ChoiceCardForm() {
  const form = useForm({
    defaultValues: {
      plan: "",
    },
    onSubmit: async ({ value }) => {
      const planLabels: Record<string, string> = {
        free: "Free Plan",
        pro: "Pro Plan",
        enterprise: "Enterprise Plan",
      };
      toast.success("Plan selected successfully!", {
        description: `Selected: ${planLabels[value.plan] || value.plan}`,
      });
      form.reset();
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose Your Plan</CardTitle>
        <CardDescription>Select the subscription plan that best fits your needs and budget.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-8"
        >
          <form.Field
            name="plan"
            validators={{
              onChange: ({ value }) => (!value ? "Please select a plan" : undefined),
            }}
            children={(field) => (
              <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                <FieldLabel>Subscription Plans</FieldLabel>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <RadioGroup
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value)}
                    className="contents"
                  >
                    {[
                      {
                        id: "free",
                        label: "Free",
                        price: "$0",
                        description: "Basic features",
                        features: ["5 projects", "1GB storage", "Email support"],
                      },
                      {
                        id: "pro",
                        label: "Pro",
                        price: "$19",
                        description: "Advanced features",
                        features: ["Unlimited projects", "10GB storage", "Priority support", "Analytics"],
                      },
                      {
                        id: "enterprise",
                        label: "Enterprise",
                        price: "$99",
                        description: "Full features",
                        features: [
                          "Everything in Pro",
                          "100GB storage",
                          "24/7 support",
                          "Custom integrations",
                          "Team management",
                        ],
                      },
                    ].map((plan) => (
                      <FieldLabel key={plan.id} htmlFor={plan.id} className="cursor-pointer">
                        <Field className="hover:bg-accent/50 h-full rounded-lg border p-4 transition-colors">
                          <div className="mb-2 flex items-center space-x-2">
                            <RadioGroupItem id={plan.id} value={plan.id} />
                            <FieldTitle>{plan.label}</FieldTitle>
                          </div>
                          <FieldDescription>
                            <div className="text-primary text-lg font-semibold">{plan.price}/month</div>
                            <div className="text-muted-foreground mb-2 text-sm">{plan.description}</div>
                            <ul className="space-y-1 text-xs">
                              {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-center">
                                  <span className="bg-primary mr-2 h-1 w-1 rounded-full"></span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </FieldDescription>
                        </Field>
                      </FieldLabel>
                    ))}
                  </RadioGroup>
                </div>
                <FieldDescription>Choose the plan that best fits your needs.</FieldDescription>
                <FieldError errors={formatFormError(field.state.meta.errors)} />
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
