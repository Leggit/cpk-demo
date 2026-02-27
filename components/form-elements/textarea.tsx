import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormElementProps } from "./types";
import { Dispatch, SetStateAction, useState } from "react";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { v4 as uuidv4 } from "uuid";

type TextAreaConfig = {
  label: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
};

type TextAreaElement = {
  id: string;
  type: "textarea";
  config: TextAreaConfig;
};

export const TextAreaControl = ({ element }: FormElementProps) => {
  const { config } = element as TextAreaElement;
  const [charCount, setCharCount] = useState(0);

  return (
    <>
      <Label className="mb-2">
        {config.label}
        {config.required && " *"}
      </Label>
      <div className="relative">
        <Textarea
          required={config.required}
          placeholder={config.placeholder}
          rows={config.rows || 4}
          maxLength={config.maxLength}
          className="mt-2"
          onChange={(e) => {
            const newCount = e.target.value.length;
            setCharCount(newCount);
          }}
        />
        {config.maxLength && (
          <div className="text-sm text-gray-500 mt-1 text-right">
            {charCount}/{config.maxLength}
          </div>
        )}
      </div>
    </>
  );
};

export const useTextAreaActions = (setForm: Dispatch<SetStateAction<Form>>) => {
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
