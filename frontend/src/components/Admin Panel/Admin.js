// import React from 'react';
import './Admin.css';

const Admin = () => {

  return (
    <div className='admin-container'>
        <h2>Admin Panel</h2>
        <div className="admin-content">
            <table border={1}>
                <thead>
                    <tr>
                        <td>S.no.</td>
                        <td>Name</td>
                        <td>Profile</td>
                        <td>Approval</td>
                    </tr>
                </thead>
                <tbody>
                      <tr>
                          <td>S.no.</td>
                          <td>Name</td>
                          <td>Profile</td>
                          <td>Approval</td>
                      </tr><tr>
                          <td>S.no.</td>
                          <td>Name</td>
                          <td>Profile</td>
                          <td>Approval</td>
                      </tr><tr>
                          <td>S.no.</td>
                          <td>Name</td>
                          <td>Profile</td>
                          <td>Approval</td>
                      </tr><tr>
                          <td>S.no.</td>
                          <td>Name</td>
                          <td>Profile</td>
                          <td>Approval</td>
                      </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Admin;