import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import usersData from "../userData.json";


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [filterDomain, setFilterDomain] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [filterAvailability, setFilterAvailability] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(20);

  // Load users from data file
  useEffect(() => {
    setUsers(usersData);
  }, []);

  // Filtered and paginated users
  const filteredUsers = users.filter((user) => {
    const nameMatch =
      user.first_name.toLowerCase().includes(searchName.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchName.toLowerCase());
    const domainMatch = filterDomain === "" || user.domain === filterDomain;
    const genderMatch = filterGender === "" || user.gender === filterGender;
    const availabilityMatch =
      filterAvailability === "" ||
      user.available.toString() === filterAvailability;
    return nameMatch && domainMatch && genderMatch && availabilityMatch;
  });

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(users.length / usersPerPage);

    return (
      <div className="pagination">
        <button
          className="pagination-btn"
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
        >
          <FaChevronLeft />
        </button>
        <button
          className="pagination-btn"
          disabled={currentPage === totalPages}
          onClick={() => paginate(currentPage + 1)}
        >
          <FaChevronRight />
        </button>
      </div>
    );
  };

  const renderUserRows = () => {
    return currentUsers.map((user) => (
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.first_name} {user.last_name}</td>
        <td>{user.domain}</td>
        <td>{user.gender}</td>
        <td>{user.available ? 'Available' : 'Not Available'}</td>
      </tr>
    ));
  };
  return (
    <div className="conatiner">
      <div className="filters">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <select
          value={filterDomain}
          onChange={(e) => setFilterDomain(e.target.value)}
        >
          <option value="">All Domains</option>
          <option value="Finance">Finance</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="IT">IT</option>
          <option value="UI Designing">UI Designing</option>
          <option value="Business Development">Business Development</option>

          {/* Domain options */}
        </select>
        <select
          value={filterGender}
          onChange={(e) => setFilterGender(e.target.value)}
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          {/* Gender options */}
        </select>
        <select
          value={filterAvailability}
          onChange={(e) => setFilterAvailability(e.target.value)}
        >
          <option value="">All Availability</option>
          <option value="true">Available</option>
          <option value="false">Not-Available</option>
          {/* Availability options */}
        </select>
      </div>
      <div className="user-list">
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Domain</th>
            <th>Gender</th>
            <th>Available</th>
          </tr>
        </thead>
        <tbody>{renderUserRows()}</tbody>
      </table>
      {users.length > usersPerPage && renderPaginationButtons()}
      </div>
    </div>
  );
};

export default UserList;
