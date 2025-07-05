"use client";

import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCopilotAction } from "@copilotkit/react-core";
import { useState } from "react";

import dynamic from "next/dynamic";

const CopilotSidebar = dynamic(
  () => import("@copilotkit/react-ui").then((mod) => mod.CopilotSidebar),
  { ssr: false } // <-- The key part!
);

type Form = {
  title: string;
  elements: {
    type: "text" | "date" | "radio";
    config: { [key: string]: any };
  }[];
};

export default function Home() {
  const [form, setForm] = useState<Form>({
    title: "",
    elements: [],
  });

  useCopilotAction({
    name: "setFormTitle",
    description: "Set the title of the form that is being built",
    parameters: [
      {
        name: "title",
        type: "string",
        description: "The title of the form",
        required: true,
      },
    ],
    handler: async ({ title }) => {
      setForm((prevForm) => ({
        ...prevForm,
        title,
      }));
    },
  });

  useCopilotAction({
    name: "addTextInputElement",
    description: "Add a text input to the form",
    parameters: [
      {
        name: "label",
        type: "string",
        description: "The label for the text input",
        required: true,
      },
      {
        name: "required",
        type: "boolean",
        description: "Whether the text input is required",
        required: false,
      },
    ],
    handler: async ({ label, required }) => {
      setForm((prevForm) => ({
        ...prevForm,
        elements: [
          ...prevForm.elements,
          { type: "text", config: { required, label } },
        ],
      }));
    },
  });

  useCopilotAction({
    name: "addRadioInputElement",
    description: "Add a radio input to the form",
    parameters: [
      {
        name: "label",
        type: "string",
        description: "The label for the radio input",
        required: true,
      },
      {
        name: "options",
        description:
          "Options for the radio input, each option should be a string",
        type: "object[]",
        attributes: [
          {
            name: "value",
            type: "string",
            description: "The value of the radio option",
            required: true,
          },
          {
            name: "label",
            type: "string",
            description: "The label for the radio option",
            required: true,
          },
        ],
        required: true,
      },
      {
        name: "required",
        type: "boolean",
        description: "Whether the radio input is required",
        required: false,
      },
    ],
    handler: async ({ label, options, required }) => {
      setForm((prevForm) => ({
        ...prevForm,
        elements: [
          ...prevForm.elements,
          { type: "radio", config: { label, options, required } },
        ],
      }));
    },
  });

  useCopilotAction({
    name: "addDateInputElement",
    description: "Add a date input to the form",
    parameters: [
      {
        name: "label",
        type: "string",
        description: "The label for the date input",
        required: true,
      },
      {
        name: "required",
        type: "boolean",
        description: "Whether the date input is required",
        required: false,
      },
      {
        name: "defaultMonth",
        type: "string",
        description:
          "The default month for the date input in ISO format (YYYY-MM-DD)",
        required: false,
      },
    ],
    handler: async ({ label, required }) => {
      setForm((prevForm) => ({
        ...prevForm,
        elements: [
          ...prevForm.elements,
          { type: "date", config: { label, required } },
        ],
      }));
    },
  });

  return (
    <>
      <div className="max-w-3xl p-4 mx-auto">
        <h1>{form.title}</h1>
        {form.elements.map((element, index) => {
          switch (element.type) {
            case "text":
              return (
                <div key={index} className="p-4 m-2 shadow-md rounded-md">
                  <Label className="mb-2">
                    {element.config.label}
                    {element.config.required && " *"}
                  </Label>
                  <Input required={element.config.required} type="text" />
                </div>
              );
            case "radio":
              return (
                <div key={index} className="p-4 m-2 shadow-md rounded-md">
                  <div className="mb-2">
                    {element.config.label}
                    {element.config.required && " *"}
                  </div>
                  <RadioGroup
                    defaultValue={element.config.defaultValue}
                    required={element.config.required}
                  >
                    {element.config.options.map((option: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-3">
                        <RadioGroupItem
                          value={option.value}
                          id={option.value + idx}
                        />
                        <Label htmlFor={option.value + idx}>
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              );
            case "date":
              return (
                <div key={index} className="p-4 m-2 shadow-md rounded-md">
                  <Label className="mb-2">
                    {element.config.label}
                    {element.config.required && " *"}
                  </Label>
                  <Calendar
                    mode="single"
                    defaultMonth={
                      element.config.defaultMonth
                        ? new Date(element.config.defaultMonth)
                        : undefined
                    }
                  />
                </div>
              );
          }
        })}
      </div>
      <CopilotSidebar
        clickOutsideToClose={false}
        defaultOpen={true}
        labels={{
          title: "Form builder assistant",
          initial: "Describe your form to me",
        }}
      />
    </>
  );
}
