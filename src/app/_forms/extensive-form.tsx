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
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";

export default function ExtensiveForm() {
  const form = useForm({
    defaultValues: {
      // Personal Information
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      bio: "",

      // Preferences
      country: "",
      plan: "",
      budget: [50],
      theme: "",
      experience: "",

      // Settings
      newsletter: false,
      notifications: false,
      darkMode: false,
      autoSave: true,

      // Interests
      interests: [] as string[],

      // Address
      address: "",
      city: "",
      zipCode: "",

      // Terms
      terms: false,
    },
    onSubmit: async ({ value }) => {
      console.log("Extensive form submitted:", value);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Extensive All-in-One Form</CardTitle>
        <CardDescription>A comprehensive form showcasing all field types and layouts.</CardDescription>
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
          {/* Personal Information */}
          <FieldSet>
            <FieldLegend>Personal Information</FieldLegend>
            <FieldDescription>Please provide your basic information below.</FieldDescription>

            <FieldGroup>
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

              <form.Field
                name="phone"
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="tel"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your phone number"
                    />
                    <FieldDescription>Optional phone number for contact.</FieldDescription>
                  </Field>
                )}
              />

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
                      Share your background, interests, or anything you'd like us to know. ({field.state.value.length}
                      /500 characters)
                    </FieldDescription>
                    {field.state.meta.isTouched && !field.state.meta.isValid && (
                      <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>

          <FieldSeparator>Preferences</FieldSeparator>

          {/* Preferences */}
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
                      <SelectItem value="in">India</SelectItem>
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

            <form.Field
              name="plan"
              validators={{
                onBlur: ({ value }) => (!value ? "Please select a plan" : undefined),
              }}
              children={(field) => (
                <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                  <FieldLabel htmlFor={field.name}>Subscription Plan</FieldLabel>
                  <Select value={field.state.value} onValueChange={(value) => field.handleChange(value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free - $0/month</SelectItem>
                      <SelectItem value="basic">Basic - $9/month</SelectItem>
                      <SelectItem value="pro">Pro - $19/month</SelectItem>
                      <SelectItem value="enterprise">Enterprise - $99/month</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldDescription>Choose the plan that best fits your needs.</FieldDescription>
                  {field.state.meta.isTouched && !field.state.meta.isValid && (
                    <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
                  )}
                </Field>
              )}
            />

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

            <form.Field
              name="theme"
              children={(field) => (
                <Field>
                  <FieldLabel>Theme Preference</FieldLabel>
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

            <form.Field
              name="experience"
              children={(field) => (
                <Field>
                  <FieldLabel>Experience Level</FieldLabel>
                  <RadioGroup
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value)}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="beginner" id="beginner" />
                      <FieldLabel htmlFor="beginner">Beginner (0-1 years)</FieldLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="intermediate" id="intermediate" />
                      <FieldLabel htmlFor="intermediate">Intermediate (2-5 years)</FieldLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="advanced" id="advanced" />
                      <FieldLabel htmlFor="advanced">Advanced (6-10 years)</FieldLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="expert" id="expert" />
                      <FieldLabel htmlFor="expert">Expert (10+ years)</FieldLabel>
                    </div>
                  </RadioGroup>
                  <FieldDescription>How many years of experience do you have?</FieldDescription>
                </Field>
              )}
            />
          </FieldGroup>

          <FieldSeparator>Settings</FieldSeparator>

          {/* Settings */}
          <FieldGroup>
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
          </FieldGroup>

          <FieldSeparator>Interests</FieldSeparator>

          {/* Interests */}
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

          <FieldSeparator>Address</FieldSeparator>

          {/* Address */}
          <FieldGroup>
            <form.Field
              name="address"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Street Address</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter your street address"
                  />
                </Field>
              )}
            />

            <form.Field
              name="city"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>City</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter your city"
                  />
                </Field>
              )}
            />

            <form.Field
              name="zipCode"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>ZIP Code</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter your ZIP code"
                  />
                </Field>
              )}
            />
          </FieldGroup>

          <FieldSeparator>Terms</FieldSeparator>

          {/* Terms */}
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
