import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import Api from "../utils/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "./employees.css"

const Directory = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState([]);
  useEffect(() => {
    apiPull();
  }, []);
  const apiPull = () => {
    Api.employeeExtract().then((res) => {
      console.log(res);
      setEmployees(res.data.results);
      setSearch(res.data.results);
    });
  };

  const sortFirstName = () => {
    let sortedFirsts = [...employees];
    sortedFirsts = sortedFirsts.sort((a, b) => {
      if (a.name.first < b.name.first) {
        return -1;
      }
      if (a.name.first > b.name.first) {
        return 1;
      }
    });
    setSearch(sortedFirsts);
  };
  const sortLastName = () => {
    let sortedLasts = [...employees];
    sortedLasts = sortedLasts.sort((a, b) => {
      if (a.name.last < b.name.last) {
        return -1;
      }
      if (a.name.last > b.name.last) {
        return 1;
      }
    });
    setSearch(sortedLasts);
  };
  const filterNames = (event) => {
    let filteredNames = employees.filter((filtered) => {
      return (
        filtered.name.first.toLowerCase().includes(event) ||
        filtered.name.last.toLowerCase().includes(event)
      );
    });
    setSearch(filteredNames);
  };

  const renderTableData = (employees) => {
    return (
      <div>
        <input
          placeholder="Filter"
          onChange={(event) => filterNames(event.target.value)}
        />
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>
                First Name
                <Button onClick={sortFirstName}>Sort By</Button>
              </th>
              <th>
                Last Name
                <Button onClick={sortLastName}>Sort By</Button>
              </th>
              <th>Email</th>
              <th>Age</th>
              <th>Phone</th>
              <th>Photo</th>
            </tr>
          </thead>
          {search.map((user) => {
            return (
              <tbody>
                <tr>
                  <td>{user.name.first}</td>
                  <td>{user.name.last}</td>
                  <td>{user.email}</td>
                  <td>{user.dob.age}</td>
                  <td>{user.phone}</td>
                  <td>
                    <img alt="" src={user.picture.medium} />
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </div>
    );
  };
  return (
    <div>
      <ul>{renderTableData(employees)}</ul>
    </div>
  );
};
export default Directory;
