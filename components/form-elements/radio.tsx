import { Form, FormElementProps } from "./types";
import { Dispatch, SetStateAction } from "react";
import { useCopilotAction } from "@copilotkit/react-core";
import { v4 as uuidv4 } from "uuid";
import { FileUpload } from "../ui/file-upload";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

type RadioConfig = {
  label: string;
  required?: boolean;
  defaultValue?: string;
  options: { value: any; label: string }[];
};

type RadioElement = {
  id: string;
  type: "radio";
  config: RadioConfig;
};

export const RadioControl = ({ element }: FormElementProps) => {
  const { config } = element as RadioElement;

  return (
    <>
      <div className="mb-2">
        {config.label}
        {config.required && " *"}
      </div>
      <RadioGroup defaultValue={config.defaultValue} required={config.required}>
        {config.options.map((option: any, idx: number) => (
          <div key={idx} className="flex items-center gap-3">
            <RadioGroupItem value={option.value} id={option.value + idx} />
            <Label htmlFor={option.value + idx}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </>
  );
};

export const useRadioControlActions = (
  setForm: Dispatch<SetStateAction<Form>>
) => {
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
          {
            id: uuidv4(),
            type: "radio",
            config: { label, options, required },
          },
        ],
      }));
    },
  });
};
