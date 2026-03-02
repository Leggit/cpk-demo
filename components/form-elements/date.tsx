import { Form, FormElementProps } from "./types";
import { Dispatch, SetStateAction } from "react";
import { useCopilotAction } from "@copilotkit/react-core";
import { v4 as uuidv4 } from "uuid";
import { Label } from "../ui/label";
import { Calendar } from "../ui/calendar";

type DateConfig = {
  label: string;
  required?: boolean;
  defaultMonth?: string;
};

type DateElement = {
  id: string;
  type: "date";
  config: DateConfig;
};

export const DateControl = ({ element }: FormElementProps) => {
  const { config } = element as DateElement;

  return (
    <>
      <Label className="mb-2">
        {config.label}
        {config.required && " *"}
      </Label>
      <Calendar
        mode="single"
        defaultMonth={
          config.defaultMonth
            ? new Date(element.config.defaultMonth)
            : undefined
        }
      />
    </>
  );
};

export const useDateControlActions = (
  setForm: Dispatch<SetStateAction<Form>>,
) => {
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
};
