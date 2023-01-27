import axios from "axios";
import "../App.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const pageSize = 5;
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [paginatedPosts, setPaginatedPosts] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  // Post Data in "/"
  useEffect(() => {
    axios
      .get("http://localhost:7000/")
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
        setPaginatedPosts(_(res.data).slice(0).take(pageSize).value());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Delete Data By Id

  const onDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this data?"
    );
    if (confirm) {
      alert("Data deleted successfully!");
      await axios
        .delete(`http://localhost:7000/${id}`)
        .then(() => {
          console.log("Data deleted successfully.");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };


  // Pagination
  const pageCount = posts ? Math.ceil(posts.length / pageSize) : 0;
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  const pagination = (pageNo) => {
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const paginatedPost = _(posts).slice(startIndex).take(pageSize).value();
    setPaginatedPosts(paginatedPost);
  };

  return (
    <div>
      <div className="m-5 d-flex justify-content-end">
        <Link to="/add">
          <button type="button" className="btn btn-primary p-2 ">
            Create New Notes
          </button>
        </Link>
      </div>
      {!paginatedPosts ? (
        "No Data"
      ) : (
        <table className="table caption-top table table-striped table-hover container center_div mt-5 border">
          <caption>
            <h3>List of Notes</h3>
          </caption>

          <thead className="tr">
            <tr className="">
              <th className="p-3">ID</th>
              <th className="p-3">Project Name</th>
              <th className="p-3">Version</th>
              <th className="p-3">Build Number</th>
              <th className="p-3">Description</th>
              <th className="p-3">Created Date</th>
              <th className="p-3">Edit</th>
              <th className="p-3">Delete</th>
            </tr>
          </thead>

          {paginatedPosts.map((data) => {
            const del = () => {
              onDelete(data.id);
              window.location.href = "/";
            };
            return (
              <tbody key={data.id}>
                <tr>
                  <td>{data.id}</td>
                  <td>{data.project_name}</td>
                  <td>{data.version}</td>
                  <td>{data.build_no}</td>
                  <td>{data.release_note}</td>
                  <td>{data.date}</td>
                  <td>
                    <Link to={"update/" + data.id}>
                      <button type="button" className="btn btn-info">
                        <FaEdit />
                      </button>
                    </Link>
                  </td>

                  <td>
                    <button type="button" className="bi-trash" onClick={del}>
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      )}
      <nav className="d-flex justify-content-end m-5 ">
        <ul className="pagination ">
          {pages.map((page, index) => (
            <li
              key={index}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <p className="page-link" onClick={() => pagination(page)}>
                {page}
              </p>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Posts;
