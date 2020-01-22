import React from "react";
import { Formik } from "formik";
//import { TextField, Button, Checkbox, Radio } from "@material-ui/core";
import * as Yup from "yup";
import Error from "./error";
import Autosuggest from "react-autosuggest";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, "too short")
    .max(255, "Too long!")
    .required("Required"),
  email: Yup.string()
    .email("must be vaild email")
    .max(255, "Too long!")
    .required("Required")
});

function App() {
  return (
    <div className="App">
      <Formik
        initialValues={{ name: "", email: "" }}
        validationSchema={validationSchema}
        onSubmit={(values,{setSubmitting,resetForm})=>
      {
        setSubmitting(true);
        setTimeout(()=>{
          alert(JSON.stringify(values,null,2));
          resetForm();
          setSubmitting(false);
        },500)


      }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="input-row">
              <label htmlFor="name">Name : </label>
              <input
                value={values.name}
                type="text"
                name="name"
                id="name"
                placeholder="Enter Name"
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.name && errors.name ? "has-error" : null}
              />
              <Error touched={touched.name} message={errors.name} />
            </div>

            <br></br>
            <div className="input-row">
              <label htmlFor="email">Email : </label>
              <input
                value={values.email}
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.email && errors.email ? "has-error" : null}
              />
              <Error touched={touched.email} message={errors.email} />
            </div>
            <br></br>
            <div className="input-row">
              <button type="submit" disabled={ isSubmitting}>Submit</button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default App;
