import { Dispatch, SetStateAction } from "react";
import { Form } from "./types";
import { useCopilotAction } from "@copilotkit/react-core";

export const useFormActions = (setForm: Dispatch<SetStateAction<Form>>) => {
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
};
