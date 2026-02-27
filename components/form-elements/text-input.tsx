import { Label } from "@/components/ui/label";
import { Form, FormElementProps } from "./types";
import { Dispatch, SetStateAction, useState } from "react";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { v4 as uuidv4 } from "uuid";
import { Input } from "../ui/input";

type TextInputConfig = {
  label: string;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
};

type TextInputElement = {
  id: string;
  type: "text";
  config: TextInputConfig;
};

export const TextInputControl = ({ element }: FormElementProps) => {
  const { config } = element as TextInputElement;

  return (
    <>
      <Label className="mb-2">
        {config.label}
        {config.required && " *"}
      </Label>
      <Input required={config.required} type="text" />
    </>
  );
};

export const useTextInputActions = (
  setForm: Dispatch<SetStateAction<Form>>
) => {
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
};
