"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";

export default function App() {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      bio: "",
      country: "",
      budget: [50],
      newsletter: false,
      notifications: false,
      theme: "light",
      preferences: [] as string[],
      plan: "",
      responsiveField1: "",
      responsiveField2: "",
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
    },
  });

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold">Comprehensive Form Example</h1>
        <p className="text-muted-foreground">
          A complete form showcasing all Shadcn Field components with TanStack Form
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Information Form</CardTitle>
          <CardDescription>Please fill out all the required fields below to complete your profile.</CardDescription>
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
            {/* Personal Information Section */}
            <FieldSet>
              <FieldLegend>Personal Information</FieldLegend>
              <FieldDescription>Please provide your basic information below.</FieldDescription>

              <FieldGroup>
                {/* Input Fields */}
                <form.Field
                  name="firstName"
                  validators={{
                    onBlur: ({ value }) =>
                      !value
                        ? "A first name is required"
                        : value.length < 3
                          ? "First name must be at least 3 characters"
                          : undefined,
                  }}
                  children={(field) => (
                    <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                      <FieldLabel htmlFor={field.name}>First Name</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                        placeholder="Enter your first name"
                      />
                      <FieldDescription>Your first name as it appears on official documents.</FieldDescription>
                      {field.state.meta.isTouched && !field.state.meta.isValid && (
                        <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                      )}
                    </Field>
                  )}
                />

                <form.Field
                  name="lastName"
                  validators={{
                    onBlur: ({ value }) =>
                      !value
                        ? "A last name is required"
                        : value.length < 2
                          ? "Last name must be at least 2 characters"
                          : undefined,
                  }}
                  children={(field) => (
                    <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                      <FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                        placeholder="Enter your last name"
                      />
                      <FieldDescription>Your last name as it appears on official documents.</FieldDescription>
                      {field.state.meta.isTouched && !field.state.meta.isValid && (
                        <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                      )}
                    </Field>
                  )}
                />

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
                      <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                        placeholder="Enter your email address"
                      />
                      <FieldDescription>We'll use this to send you important updates.</FieldDescription>
                      {field.state.meta.isTouched && !field.state.meta.isValid && (
                        <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>

            {/* Textarea Example */}
            <FieldSet>
              <FieldLegend>Bio</FieldLegend>
              <FieldDescription>Tell us a bit about yourself.</FieldDescription>

              <FieldGroup>
                <form.Field
                  name="bio"
                  validators={{
                    onBlur: ({ value }) =>
                      value && value.length > 500 ? "Bio must be less than 500 characters" : undefined,
                  }}
                  children={(field) => (
                    <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                      <FieldLabel htmlFor={field.name}>About You</FieldLabel>
                      <Textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                        placeholder="Tell us about yourself..."
                        className="min-h-24"
                      />
                      <FieldDescription>
                        Share your background, interests, or anything you'd like us to know.
                      </FieldDescription>
                      {field.state.meta.isTouched && !field.state.meta.isValid && (
                        <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>

            {/* Select Example */}
            <FieldSet>
              <FieldLegend>Preferences</FieldLegend>
              <FieldDescription>Choose your preferences below.</FieldDescription>

              <FieldGroup>
                <form.Field
                  name="country"
                  validators={{
                    onBlur: ({ value }) => (!value ? "Please select a country" : undefined),
                  }}
                  children={(field) => (
                    <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                      <FieldLabel htmlFor={field.name}>Country</FieldLabel>
                      <Select value={field.state.value} onValueChange={(value) => field.handleChange(value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                          <SelectItem value="de">Germany</SelectItem>
                          <SelectItem value="fr">France</SelectItem>
                        </SelectContent>
                      </Select>
                      <FieldDescription>Select your country of residence.</FieldDescription>
                      {field.state.meta.isTouched && !field.state.meta.isValid && (
                        <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>

            {/* Slider Example */}
            <FieldSet>
              <FieldLegend>Budget</FieldLegend>
              <FieldDescription>Set your monthly budget range.</FieldDescription>

              <FieldGroup>
                <form.Field
                  name="budget"
                  children={(field) => (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Monthly Budget</FieldLabel>
                      <Slider
                        value={field.state.value}
                        onValueChange={(value) => field.handleChange(value)}
                        max={1000}
                        min={0}
                        step={50}
                        className="w-full"
                      />
                      <FieldDescription>Current budget: ${field.state.value[0]}</FieldDescription>
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>

            {/* Switch Examples */}
            <FieldSet>
              <FieldLegend>Notifications</FieldLegend>
              <FieldDescription>Manage your notification preferences.</FieldDescription>

              <FieldGroup>
                <form.Field
                  name="newsletter"
                  children={(field) => (
                    <Field orientation="horizontal">
                      <Switch
                        id={field.name}
                        checked={field.state.value}
                        onCheckedChange={(checked) => field.handleChange(checked)}
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
                        onCheckedChange={(checked) => field.handleChange(checked)}
                      />
                      <FieldContent>
                        <FieldLabel htmlFor={field.name}>Push Notifications</FieldLabel>
                        <FieldDescription>Get notified about important updates and messages.</FieldDescription>
                      </FieldContent>
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>

            {/* Radio Group Example */}
            <FieldSet>
              <FieldLegend>Theme Preference</FieldLegend>
              <FieldDescription>Choose your preferred theme.</FieldDescription>

              <FieldGroup>
                <form.Field
                  name="theme"
                  children={(field) => (
                    <Field>
                      <FieldLabel>Theme</FieldLabel>
                      <RadioGroup
                        value={field.state.value}
                        onValueChange={(value) => field.handleChange(value)}
                        className="grid grid-cols-3 gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="light" id="light" />
                          <FieldLabel htmlFor="light">Light</FieldLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="dark" id="dark" />
                          <FieldLabel htmlFor="dark">Dark</FieldLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="system" id="system" />
                          <FieldLabel htmlFor="system">System</FieldLabel>
                        </div>
                      </RadioGroup>
                      <FieldDescription>Choose how the interface should look.</FieldDescription>
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>

            {/* Checkbox Group Example */}
            <FieldSet>
              <FieldLegend>Interests</FieldLegend>
              <FieldDescription>Select topics that interest you.</FieldDescription>

              <FieldGroup>
                <form.Field
                  name="preferences"
                  children={(field) => (
                    <Field>
                      <FieldLabel>Topics of Interest</FieldLabel>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { id: "tech", label: "Technology" },
                          { id: "design", label: "Design" },
                          { id: "business", label: "Business" },
                          { id: "science", label: "Science" },
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
              </FieldGroup>
            </FieldSet>

            {/* Choice Card Example */}
            <FieldSet>
              <FieldLegend>Plan Selection</FieldLegend>
              <FieldDescription>Choose your subscription plan.</FieldDescription>

              <FieldGroup>
                <form.Field
                  name="plan"
                  children={(field) => (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <RadioGroup
                        value={field.state.value}
                        onValueChange={(value) => field.handleChange(value)}
                        className="contents"
                      >
                        {[
                          { id: "free", label: "Free", price: "$0", description: "Basic features" },
                          { id: "pro", label: "Pro", price: "$19", description: "Advanced features" },
                          { id: "enterprise", label: "Enterprise", price: "$99", description: "Full features" },
                        ].map((plan) => (
                          <FieldLabel key={plan.id} htmlFor={plan.id} className="cursor-pointer">
                            <Field className="h-full">
                              <div className="mb-2 flex items-center space-x-2">
                                <RadioGroupItem id={plan.id} value={plan.id} />
                                <FieldTitle>{plan.label}</FieldTitle>
                              </div>
                              <FieldDescription>
                                <div className="text-lg font-semibold">{plan.price}/month</div>
                                <div>{plan.description}</div>
                              </FieldDescription>
                            </Field>
                          </FieldLabel>
                        ))}
                      </RadioGroup>
                    </div>
                  )}
                />
              </FieldGroup>
            </FieldSet>

            {/* Responsive Layout Example */}
            <FieldSet>
              <FieldLegend variant="label">Responsive Fields</FieldLegend>
              <FieldDescription>These fields adapt to different screen sizes.</FieldDescription>

              <FieldGroup className="@container/field-group">
                <form.Field
                  name="responsiveField1"
                  children={(field) => (
                    <Field orientation="responsive">
                      <FieldLabel htmlFor={field.name}>Responsive Field 1</FieldLabel>
                      <FieldContent>
                        <Input
                          id={field.name}
                          value={String(field.state.value || "")}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="This field adapts to screen size"
                        />
                        <FieldDescription>
                          This field switches between vertical and horizontal layouts based on screen size.
                        </FieldDescription>
                      </FieldContent>
                    </Field>
                  )}
                />

                <FieldSeparator>Or continue with</FieldSeparator>

                <form.Field
                  name="responsiveField2"
                  children={(field) => (
                    <Field orientation="responsive">
                      <FieldLabel htmlFor={field.name}>Responsive Field 2</FieldLabel>
                      <FieldContent>
                        <Input
                          id={field.name}
                          value={String(field.state.value || "")}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Another responsive field"
                        />
                        <FieldDescription>Notice how the layout changes on different screen sizes.</FieldDescription>
                      </FieldContent>
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>

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
    </div>
  );
}
