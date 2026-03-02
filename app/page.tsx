"use client";

import { useCopilotReadable } from "@copilotkit/react-core";
import { useState } from "react";

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
import {
  DateControl,
  useDateControlActions,
} from "@/components/form-elements/date";

const CopilotSidebar = dynamic(
  () => import("@copilotkit/react-ui").then((mod) => mod.CopilotSidebar),
  { ssr: false }, // <-- The key part!
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
  useTextInputActions(setForm);
  useTextAreaActions(setForm);
  useFileUploadActions(setForm);
  useRadioControlActions(setForm);
  useDateControlActions(setForm);

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
                  <DateControl element={element} />
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
