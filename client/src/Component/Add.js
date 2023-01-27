import axios from "axios";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";

const AddData = () => {
  const navigate = useNavigate();
  // Add Date
  var currentDate = new Date();
  var date = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  var createdDate = date + "/" + month + "/" + year;
  console.log(createdDate);

  const schema = yup.object().shape({
    project_name: yup.string().required(),
    version: yup.string().required(),
    build_no: yup.string().required(),
    release_note: yup.string().required(),
    date: yup.string().required(),
  });

  return (
    <div>
      <Formik
        enableReinitialize={true}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          var currentDate = new Date();
          var date = currentDate.getDate();
          var month = currentDate.getMonth() + 1;
          var year = currentDate.getFullYear();
          var createdDate = date + "/" + month + "/" + year;
          console.log(createdDate);

          axios
            .post("http://localhost:7000/", values)
            .then((res) => {
              alert("Form data submitted successfully!");
              navigate("/");
              setSubmitting(false);
            })
            .catch((err) => {
              console.log(err);
              setSubmitting(false);
            });
        }}
        initialValues={{
          project_name: "",
          version: "",
          build_no: "",
          release_note: "",
          date: `${createdDate}`,
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <div className="form-group d-flex flex-column container center_div mt-5">
              <div className="mt-5">
                <h1>Add New Notes</h1>
              </div>

              <Form.Group controlId="1" className="mb-3 mt-3">
                <Form.Label>Enter The Project Title</Form.Label>
                <Form.Control
                  type="text"
                  name="project_name"
                  placeholder="Project title"
                  value={values.project_name}
                  onChange={handleChange}
                  isValid={touched.project_name && !errors.project_name}
                  isInvalid={!!errors.project_name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.project_name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="2">
                <Form.Label>Please Provide Project Version</Form.Label>
                <Form.Control
                  type="number"
                  name="version"
                  placeholder="Version"
                  value={values.version}
                  onChange={handleChange}
                  isInvalid={!!errors.version}
                  isValid={touched.version && !errors.version}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.version}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="3">
                <Form.Label>Please Provide Build Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Build Number"
                  name="build_no"
                  value={values.build_no}
                  onChange={handleChange}
                  isInvalid={!!errors.build_no}
                  isValid={touched.build_no && !errors.build_no}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.build_no}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="4">
                <Form.Label>Please Enter The Description</Form.Label>
                <Form.Control
                  rows={5}
                  type="text"
                  placeholder="Note Description"
                  value={values.release_note}
                  name="release_note"
                  onChange={handleChange}
                  isInvalid={!!errors.release_note}
                  isValid={touched.release_note && !errors.release_note}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.release_note}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="date mb-3">
                <Form.Control
                  type="text"
                  name="date"
                  id="date"
                  defaultValue={values.date}
                  placeholder="Date"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <Button type="submit" className="btn btn-primary">
                  Add
                </Button>
              </div>

              <div className="mb-3">
                <Link to="/">
                  <Button className="btn btn-primary">Go Back</Button>
                </Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddData;
