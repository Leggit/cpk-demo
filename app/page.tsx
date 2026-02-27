"use client";

import { Calendar } from "@/components/ui/calendar";
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import dynamic from "next/dynamic";
import {
  TextAreaControl,
  useTextAreaActions,
} from "@/components/form-elements/textarea";
import { Form } from "@/components/form-elements";
import { useFormActions } from "@/components/form-elements/actions";
import {
  TextInputControl,
  useTextInputActions,
} from "@/components/form-elements/text-input";
import {
  FileUploadControl,
  useFileUploadActions,
} from "@/components/form-elements/file-upload";
import {
  RadioControl,
  useRadioControlActions,
} from "@/components/form-elements/radio";

const CopilotSidebar = dynamic(
  () => import("@copilotkit/react-ui").then((mod) => mod.CopilotSidebar),
  { ssr: false } // <-- The key part!
);

export default function Home() {
  const [form, setForm] = useState<Form>({
    title: "",
    elements: [],
  });

  useCopilotReadable({
    description: "The form that the user is creating and editing",
    value: form,
  });

  useFormActions(setForm);

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

  useTextInputActions(setForm);
  useTextAreaActions(setForm);
  useFileUploadActions(setForm);
  useRadioControlActions(setForm);

  return (
    <>
      <div className="max-w-3xl p-4 mx-auto">
        <h1>{form.title}</h1>
        {form.elements.map((element, index) => {
          switch (element.type) {
            case "text":
              return (
                <div key={index} className="p-4 m-2 shadow-md rounded-md">
                  <TextInputControl element={element} />
                </div>
              );
            case "radio":
              return (
                <div key={index} className="p-4 m-2 shadow-md rounded-md">
                  <RadioControl element={element} />
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
                  <FileUploadControl element={element} />
                </div>
              );
            case "textarea":
              return (
                <div key={index} className="p-4 m-2 shadow-md rounded-md">
                  <TextAreaControl element={element} />
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
