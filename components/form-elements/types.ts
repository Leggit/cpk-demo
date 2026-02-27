export type BaseFormElement = {
  id: string;
  type: "text" | "date" | "radio" | "file" | "textarea";
  config: { [key: string]: any };
};

export type FormElementProps = {
  element: BaseFormElement;
  onChange?: (value: any) => void;
};

export type Form = {
  title: string;
  elements: BaseFormElement[];
};
