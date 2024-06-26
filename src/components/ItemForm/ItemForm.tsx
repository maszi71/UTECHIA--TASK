import React from "react";
import { Formik, Form, Field } from "formik";
import { FormProps } from "./ItemForm.type";



const FormComponent: React.FC<FormProps> = ({ onSubmit }) => {
  const handleSubmit = (values: { title: string }) => {
    onSubmit(values.title);
  };

  return (
    <Formik initialValues={{ title: "" }} onSubmit={handleSubmit}>
      <Form className="flex mb-4">
        <Field
          name="title"
          type="text"
          className="border rounded p-2 flex-1"
          placeholder="Enter item title"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Item
        </button>
      </Form>
    </Formik>
  );
};

export default FormComponent;
