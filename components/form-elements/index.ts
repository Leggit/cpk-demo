import { TextAreaControl, useTextAreaActions } from "./textarea";
export * from "./types";

export const FormControls = {
  textarea: TextAreaControl,
};

export const FormActions = {
  textarea: useTextAreaActions,
};
