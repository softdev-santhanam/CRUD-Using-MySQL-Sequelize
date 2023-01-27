import axios from "axios";
import "../App.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import _ from "lodash";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const pageSize = 1;
const Posts = (props) => {
  const navigate = useNavigate();
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

  // Delete Data By Id
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:7000/${id}`, posts)
      .then(() => {
        alert("Data deleted successfully!");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
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
          <caption>List of Notes</caption>

          <thead className="tr">
            <tr className="p">
              <th>ID</th>
              <th>Project Name</th>
              <th>Version</th>
              <th>Build Number</th>
              <th>Description</th>
              <th>Created Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          {paginatedPosts.map((data) => {
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
                    <button
                      type="button"
                      className="bi-trash"
                      onClick={() => handleDelete(data.id)}
                    >
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
