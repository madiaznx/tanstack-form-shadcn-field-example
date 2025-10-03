"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

import CheckboxForm from "@/app/_forms/checkbox-form";
import ChoiceCardForm from "@/app/_forms/choice-card-form";
import ExtensiveForm from "@/app/_forms/extensive-form";
import FieldGroupForm from "@/app/_forms/field-group-form";
import FieldsetForm from "@/app/_forms/fieldset-form";
import InputForm from "@/app/_forms/input-form";
import RadioForm from "@/app/_forms/radio-form";
import ResponsiveForm from "@/app/_forms/responsive-form";
import SelectForm from "@/app/_forms/select-form";
import SignupForm from "@/app/_forms/signup-form";
import SliderForm from "@/app/_forms/slider-form";
import SwitchForm from "@/app/_forms/switch-form";
import TextareaForm from "@/app/_forms/textarea-form";

const formOptions = [
  { id: "input", label: "Input Fields", component: InputForm },
  { id: "textarea", label: "Textarea Fields", component: TextareaForm },
  { id: "select", label: "Select Fields", component: SelectForm },
  { id: "slider", label: "Slider Fields", component: SliderForm },
  { id: "fieldset", label: "Fieldset Example", component: FieldsetForm },
  { id: "checkbox", label: "Checkbox Fields", component: CheckboxForm },
  { id: "radio", label: "Radio Fields", component: RadioForm },
  { id: "switch", label: "Switch Fields", component: SwitchForm },
  { id: "choice-card", label: "Choice Card", component: ChoiceCardForm },
  { id: "field-group", label: "Field Group", component: FieldGroupForm },
  { id: "responsive", label: "Responsive Layout", component: ResponsiveForm },
  { id: "extensive", label: "Extensive All-in-One", component: ExtensiveForm },
  { id: "signup", label: "Sign Up Form", component: SignupForm },
];

export default function App() {
  const [selectedForm, setSelectedForm] = useState(formOptions[0]);

  const SelectedFormComponent = selectedForm.component;

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Shadcn Field Components with TanStack Form</h1>
        <p className="text-muted-foreground">
          Explore different form field types and layouts using Shadcn Field components with TanStack Form validation.
        </p>

        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">Select Form Type:</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="min-w-[200px] justify-between">
                {selectedForm.label}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[300px]">
              {formOptions.map((option) => (
                <DropdownMenuItem key={option.id} onClick={() => setSelectedForm(option)} className="cursor-pointer">
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <SelectedFormComponent />
    </div>
  );
}
