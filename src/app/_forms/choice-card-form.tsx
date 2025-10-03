"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldLabel, FieldTitle } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "@tanstack/react-form";

export default function ChoiceCardForm() {
  const form = useForm({
    defaultValues: {
      plan: "",
      theme: "",
      size: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Choice card form submitted:", value);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Choice Card Example</CardTitle>
        <CardDescription>Selectable card layouts for better visual choice selection.</CardDescription>
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
                <FieldLabel>Subscription Plan</FieldLabel>
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
                {field.state.meta.isTouched && !field.state.meta.isValid && (
                  <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                )}
              </Field>
            )}
          />

          <form.Field
            name="theme"
            children={(field) => (
              <Field>
                <FieldLabel>Theme Selection</FieldLabel>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <RadioGroup
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value)}
                    className="contents"
                  >
                    {[
                      { id: "light", label: "Light", description: "Clean and bright" },
                      { id: "dark", label: "Dark", description: "Easy on the eyes" },
                      { id: "blue", label: "Blue", description: "Professional look" },
                      { id: "green", label: "Green", description: "Nature inspired" },
                    ].map((theme) => (
                      <FieldLabel key={theme.id} htmlFor={theme.id} className="cursor-pointer">
                        <Field className="hover:bg-accent/50 h-full rounded-lg border p-4 text-center transition-colors">
                          <div className="mb-2 flex justify-center">
                            <RadioGroupItem id={theme.id} value={theme.id} />
                          </div>
                          <FieldTitle>{theme.label}</FieldTitle>
                          <FieldDescription className="text-xs">{theme.description}</FieldDescription>
                        </Field>
                      </FieldLabel>
                    ))}
                  </RadioGroup>
                </div>
                <FieldDescription>Choose your preferred color theme.</FieldDescription>
              </Field>
            )}
          />

          <form.Field
            name="size"
            children={(field) => (
              <Field>
                <FieldLabel>Company Size</FieldLabel>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <RadioGroup
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value)}
                    className="contents"
                  >
                    {[
                      {
                        id: "startup",
                        label: "Startup",
                        description: "1-10 employees",
                        icon: "🚀",
                      },
                      {
                        id: "small",
                        label: "Small Business",
                        description: "11-50 employees",
                        icon: "🏢",
                      },
                      {
                        id: "medium",
                        label: "Medium Business",
                        description: "51-200 employees",
                        icon: "🏭",
                      },
                      {
                        id: "large",
                        label: "Enterprise",
                        description: "200+ employees",
                        icon: "🏛️",
                      },
                    ].map((size) => (
                      <FieldLabel key={size.id} htmlFor={size.id} className="cursor-pointer">
                        <Field className="hover:bg-accent/50 h-full rounded-lg border p-4 transition-colors">
                          <div className="mb-2 flex items-center space-x-2">
                            <RadioGroupItem id={size.id} value={size.id} />
                            <span className="text-lg">{size.icon}</span>
                            <FieldTitle>{size.label}</FieldTitle>
                          </div>
                          <FieldDescription>{size.description}</FieldDescription>
                        </Field>
                      </FieldLabel>
                    ))}
                  </RadioGroup>
                </div>
                <FieldDescription>What's the size of your organization?</FieldDescription>
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
