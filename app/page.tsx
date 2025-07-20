"use client";

import { Calendar } from "@/components/ui/calendar";
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import dynamic from "next/dynamic";

const CopilotSidebar = dynamic(
  () => import("@copilotkit/react-ui").then((mod) => mod.CopilotSidebar),
  { ssr: false } // <-- The key part!
);

type Form = {
  title: string;
  elements: {
    id: string;
    type: "text" | "date" | "radio" | "file" | "textarea";
    config: { [key: string]: any };
  }[];
};

export default function Home() {
  const [form, setForm] = useState<Form>({
    title: "",
    elements: [],
  });

  useCopilotReadable({
    description: "The form that the user is creating and editing",
    value: form,
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
          { id: uuidv4(), type: "text", config: { required, label } },
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
          { id: uuidv4(), type: "radio", config: { label, options, required } },
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
          { id: uuidv4(), type: "date", config: { label, required } },
        ],
      }));
    },
  });

  useCopilotAction({
    name: "addTextAreaElement",
    description: "Add a textarea input to the form for longer text content",
    parameters: [
      {
        name: "label",
        type: "string",
        description: "The label for the textarea",
        required: true,
      },
      {
        name: "required",
        type: "boolean",
        description: "Whether the textarea is required",
        required: false,
      },
      {
        name: "placeholder",
        type: "string",
        description: "Placeholder text for the textarea",
        required: false,
      },
      {
        name: "rows",
        type: "number",
        description: "Number of visible text lines",
        required: false,
      },
      {
        name: "maxLength",
        type: "number",
        description: "Maximum number of characters allowed",
        required: false,
      },
    ],
    handler: async ({ label, required, placeholder, rows, maxLength }) => {
      setForm((prevForm) => ({
        ...prevForm,
        elements: [
          ...prevForm.elements,
          {
            id: uuidv4(),
            type: "textarea",
            config: { label, required, placeholder, rows, maxLength },
          },
        ],
      }));
    },
  });

  useCopilotAction({
    name: "editFormElement",
    description: "Edit an existing form element's properties",
    parameters: [
      {
        name: "elementId",
        type: "string",
        description: "The ID of the element to edit",
        required: true,
      },
      {
        name: "label",
        type: "string",
        description: "The new label for the element",
        required: false,
      },
      {
        name: "required",
        type: "boolean",
        description: "Whether the element is required",
        required: false,
      },
      {
        name: "placeholder",
        type: "string",
        description: "Placeholder text (for text and textarea elements)",
        required: false,
      },
      {
        name: "rows",
        type: "number",
        description: "Number of visible lines (for textarea elements)",
        required: false,
      },
      {
        name: "maxLength",
        type: "number",
        description: "Maximum number of characters (for textarea elements)",
        required: false,
      },
      {
        name: "accept",
        type: "string",
        description: "File types to accept (for file upload elements)",
        required: false,
      },
      {
        name: "multiple",
        type: "boolean",
        description:
          "Whether multiple files can be uploaded (for file upload elements)",
        required: false,
      },
      {
        name: "options",
        type: "object[]",
        description: "Options for radio inputs",
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
        required: false,
      },
    ],
    handler: async ({ elementId, ...updates }) => {
      setForm((prevForm) => ({
        ...prevForm,
        elements: prevForm.elements.map((element) =>
          element.id === elementId
            ? { ...element, config: { ...element.config, ...updates } }
            : element
        ),
      }));
    },
  });

  useCopilotAction({
    name: "removeFormElement",
    description: "Remove an element from the form",
    parameters: [
      {
        name: "elementId",
        type: "string",
        description: "The ID of the element to remove",
        required: true,
      },
    ],
    handler: async ({ elementId }) => {
      setForm((prevForm) => ({
        ...prevForm,
        elements: prevForm.elements.filter(
          (element) => element.id !== elementId
        ),
      }));
    },
  });

  useCopilotAction({
    name: "addFileUploadElement",
    description: "Add a file upload input to the form",
    parameters: [
      {
        name: "label",
        type: "string",
        description: "The label for the file upload",
        required: true,
      },
      {
        name: "required",
        type: "boolean",
        description: "Whether the file upload is required",
        required: false,
      },
      {
        name: "accept",
        type: "string",
        description: "File types to accept (e.g., '.pdf,.doc,image/*')",
        required: false,
      },
      {
        name: "multiple",
        type: "boolean",
        description: "Whether multiple files can be uploaded",
        required: false,
      },
    ],
    handler: async ({ label, required, accept, multiple }) => {
      setForm((prevForm) => ({
        ...prevForm,
        elements: [
          ...prevForm.elements,
          {
            id: uuidv4(),
            type: "file",
            config: { label, required, accept, multiple },
          },
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
            case "file":
              return (
                <div key={index} className="p-4 m-2 shadow-md rounded-md">
                  <FileUpload
                    label={element.config.label}
                    required={element.config.required}
                    accept={element.config.accept}
                    multiple={element.config.multiple}
                  />
                </div>
              );
            case "textarea":
              return (
                <div key={index} className="p-4 m-2 shadow-md rounded-md">
                  <Label className="mb-2">
                    {element.config.label}
                    {element.config.required && " *"}
                  </Label>
                  <div className="relative">
                    <Textarea
                      required={element.config.required}
                      placeholder={element.config.placeholder}
                      rows={element.config.rows || 4}
                      maxLength={element.config.maxLength}
                      className="mt-2"
                      onChange={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        const counter =
                          target.nextElementSibling as HTMLElement;
                        if (counter) {
                          counter.textContent = `${target.value.length}/${element.config.maxLength}`;
                        }
                      }}
                    />
                    {element.config.maxLength && (
                      <div className="text-sm text-gray-500 mt-1 text-right">
                        0/{element.config.maxLength}
                      </div>
                    )}
                  </div>
                </div>
              );
          }
        })}
      </div>
      <CopilotSidebar
        clickOutsideToClose={false}
        defaultOpen={true}
        instructions="You can help me build a form by adding elements like text inputs, radio buttons, date pickers, file uploads, and text areas"
        labels={{
          title: "Form builder assistant",
          initial: "Describe your form to me",
        }}
      />
    </>
  );
}
