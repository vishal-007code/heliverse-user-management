import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const TeamBuilder = ({ users }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [teamDetails, setTeamDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(20);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  // Add user to the selected users list
  const addUser = (user) => {
    if (user.available && !selectedUsers.find((selectedUser) => selectedUser.domain === user.domain)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  // Remove user from the selected users list
  const removeUser = (user) => {
    const updatedUsers = selectedUsers.filter((selectedUser) => selectedUser.id !== user.id);
    setSelectedUsers(updatedUsers);
  };

  // Calculate team details
  const calculateTeamDetails = () => {
    const domains = selectedUsers.map((user) => user.domain);
    const uniqueDomains = [...new Set(domains)];

    const teamSize = selectedUsers.length;
    const totalDomains = uniqueDomains.length;

    setTeamDetails({ teamSize, totalDomains });
  };

  // Pagination - Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = showAvailableOnly
    ? users.filter((user) => user.available).slice(indexOfFirstUser, indexOfLastUser)
    : users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }
  

  // Toggle show available only
  const toggleShowAvailableOnly = () => {
    setShowAvailableOnly(!showAvailableOnly);
    setCurrentPage(1);
  };

  // Render selected users table
  const renderSelectedUsersTable = () => {
    return (
      <table className="selected-users">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Domain</th>
            <th>Gender</th>
            <th>Available</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {selectedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.domain}</td>
              <td>{user.gender}</td>
              <td>{user.available ? 'Available' : 'Not Available'}</td>
              <td>
                <button className="remove-user-btn" onClick={() => removeUser(user)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // Render user list table
  const renderUserListTable = () => {
    return (
      <table className="user-list">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Domain</th>
            <th>Gender</th>
            <th>Available</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.domain}</td>
              <td>{user.gender}</td>
              <td>{user.available ? 'Available' : 'Not Available'}</td>
              <td>
                <button
                  className="add-user-btn"
                  onClick={() => addUser(user)}
                  disabled={!user.available || selectedUsers.find((selectedUser) => selectedUser.domain === user.domain)}
                >
                  Add
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };


  return (
    <div>
      <h2>Team Builder</h2>
      <div className="team-builder">
        <div className="user-list-container">
          <h3>User List</h3>
          <div className="filter-options">
            <label htmlFor="showAvailableOnly">
              <input
                type="checkbox"
                id="showAvailableOnly"
                checked={showAvailableOnly}
                onChange={toggleShowAvailableOnly}
              />
              Show Available Only
            </label>
          </div>
          {renderUserListTable()}
          <div className="pagination">
            <button
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <FaChevronLeft />
            </button>
            <button
              className="pagination-btn"
              disabled={currentPage === pageNumbers.length}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
        <div className="selected-users-container">
          <h3>Selected Users</h3>
          {renderSelectedUsersTable()}
          <button className="calculate-team-btn" onClick={calculateTeamDetails}>
            Calculate Team Details
          </button>
          {teamDetails && (
            <div className="team-details">
              <h3>Team Details</h3>
              <table className="team-details-table">
                <tbody>
                  <tr>
                    <td>Team Size:</td>
                    <td>{teamDetails.teamSize}</td>
                  </tr>
                  <tr>
                    <td>Total Domains:</td>
                    <td>{teamDetails.totalDomains}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamBuilder;
