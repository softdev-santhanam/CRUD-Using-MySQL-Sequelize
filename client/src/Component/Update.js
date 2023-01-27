import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams(); //The useParams() hook helps us to access the URL parameters from a current route.

  const [data, setData] = useState({
    userId: null,
    project_name: null,
    version: null,
    build_no: null,
    release_note: null,
  });

  const { project_name, version, build_no, release_note } = data;

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const navigate = useNavigate();

  const updateNotes = (e) => {
    e.preventDefault();
    try {
      axios.put(`http://localhost:7000/${id}`, data);
      console.log(data);
      alert("Form Updated Successfully!");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const loadUser = () => {
    fetch(`http://localhost:7000/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setData({
          userId: result.id,
          project_name: result.project_name,
          version: result.version,
          build_no: result.build_no,
          release_note: result.release_note,
        });
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="form-group d-flex flex-column container center_div mt-5">
      <div className="mt-5">
        <h1>Add New Notes</h1>
      </div>
      <div className="mb-3 mt-3">
        <input
          className="form-control"
          type="text"
          placeholder="Project Name"
          name="project_name"
          defaultValue={project_name}
          onChange={handleChange}
          id="my_input"
        />
      </div>

      <div className="mb-3">
        <input
          className="form-control"
          type="number"
          placeholder="Version"
          name="version"
          defaultValue={version}
          onChange={handleChange}
          id="my_input"
        />
      </div>

      <div className="mb-3">
        <input
          className="form-control"
          type="number"
          placeholder="Build Number"
          name="build_no"
          defaultValue={build_no}
          onChange={handleChange}
          id="my_input"
        />
      </div>

      <div className="mb-3">
        <textarea
          className="form-control"
          rows={5}
          type="text"
          placeholder="Release Note"
          name="release_note"
          defaultValue={release_note}
          onChange={handleChange}
          id="my_input"
        />
      </div>

      <div className="mb-3">
        <button className="btn btn-primary" onClick={updateNotes}>
          Update
        </button>
      </div>

      <div className="mb-3">
        <Link to="/">
          <button className="btn btn-primary">Go Back</button>
        </Link>
      </div>
    </div>
  );
};

export default EditEmployee;
