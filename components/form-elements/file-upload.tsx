import { Form, FormElementProps } from "./types";
import { Dispatch, SetStateAction } from "react";
import { useCopilotAction } from "@copilotkit/react-core";
import { v4 as uuidv4 } from "uuid";
import { FileUpload } from "../ui/file-upload";

type FileUploadConfig = {
  label: string;
  required?: boolean;
  accept?: string;
  multiple?: boolean;
};

type FileUploadElement = {
  id: string;
  type: "file";
  config: FileUploadConfig;
};

export const FileUploadControl = ({ element }: FormElementProps) => {
  const { config } = element as FileUploadElement;

  return (
    <>
      <FileUpload
        label={config.label}
        required={config.required}
        accept={config.accept}
        multiple={config.multiple}
      />
    </>
  );
};

export const useFileUploadActions = (
  setForm: Dispatch<SetStateAction<Form>>
) => {
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
};
