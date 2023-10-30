import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { AiFillPlusSquare } from "react-icons/ai";
import { getAllUsers, getfilteredUser } from "../../api/userRequest";
import user from "../images/user3.png";
import SideNav from "../../components/SideNav/SideNav.js";
import { useNavigate } from "react-router-dom";
import { createChat } from "../../api/chatRequest";
import Mobilecommonhead from "../Mobilecommonhead";
import RightProfileComp from "../Profile/Right Profile/RightProfileComp";
import "./index.css";
import {
  getSearchResultByPeople,
  getSearchResultByPost,
} from "../../api/searchFilter";

function Searchbar({ userData, setProgress, Mentor, isFetched, notifyList }) {
  const [collegeFilter, setCollegeFilter] = useState(false);
  const [degreeFilter, setDegreeFilter] = useState(false);
  const [companyFilter, setCompanyFilter] = useState(false);
  const [jobFilter, setJobFilter] = useState(false);
  const [locationFilter, setLocationFilter] = useState(false);

  const [searchPeople, setSearchPeople] = useState(true);
  const [searchPost, setSearchPost] = useState(false);

  const [searching, setSearching] = useState(false);

  const [filterFields, setFilterFields] = useState({
    keyword: "",
    college: "",
    degree: "",
    company: "",
    job: "",
    location: "",
  });

  const addCollegeFilter = () => {
    setCollegeFilter(!collegeFilter);
  };
  const addDegreeFilter = () => {
    setDegreeFilter(!degreeFilter);
  };
  const addCompanyFilter = () => {
    setCompanyFilter(!companyFilter);
  };
  const addJobFilter = () => {
    setJobFilter(!jobFilter);
  };
  const addLocationFilter = () => {
    setLocationFilter(!locationFilter);
  };

  const onChangeFilter = async (e) => {
    setFilterFields({ ...filterFields, [e.target.name]: e.target.value });
    console.log(filterFields);
    setSearching(true);
    if (searchPeople) {
      try {
        const { data } = await getSearchResultByPeople(
          filterFields.keyword,
          filterFields.college,
          filterFields.degree,
          filterFields.job,
          filterFields.company,
          filterFields.location
        );
        setUsersData(data.result);
      } catch (error) {
        console.log(error);
      }
      setSearching(false);
    } else {
      try {
        const { data } = await getSearchResultByPost(filterFields.keyword);
        setUsersData(data.result);
      } catch (error) {
        console.log(error);
      }
      setSearching(false);
    }
  };
  const navigate = useNavigate();
  const [setUsers, setUsersData] = useState([]);

  const handlePeople = (e) => {
    setSearchPeople(!searchPeople);
    document.getElementById("people-search").style.color = "black";
    document.getElementById("people-search").style.fontWeight = "800";
    document.getElementById("post-search").style.color = "gray";
    document.getElementById("post-search").style.color = "400";
    setUsersData([]);
  };
  const handlePost = (e) => {
    // setSearchPost(!searchPost);
    setSearchPeople(false);
    document.getElementById("post-search").style.color = "black";
    document.getElementById("post-search").style.fontWeight = "800";
    document.getElementById("people-search").style.color = "gray";
    document.getElementById("people-search").style.color = "400";
    setUsersData([]);
  };

  const redirecttobookings = (id) => {
    navigate(`/bookslot/${id}`);
    window.location.reload();
  };

  return (
    <>
      <SideNav setProgress={setProgress} Mentor={Mentor} isFetched={isFetched} notifyList={notifyList} />
      <Mobilecommonhead />
      <div className="partition-plus-panel">
        <div>
          <div className="partition-s"></div>
          <div className="search-panel">
            <div className="search-head">Search</div>
            <div className="input-div-search">
              <input
                type="text"
                name="keyword"
                placeholder="Company, People, Skill..."
                onChange={(e) => {
                  onChangeFilter(e);
                }}
              />
              <AiOutlineSearch
                style={{ fontSize: "22px", marginRight: "15px" }}
              />
            </div>
            <div className="filter-options-search">
              <div>Search by : </div>
              <div
                className="filterss"
                id="people-search"
                onClick={handlePeople}
              >
                People
              </div>
              <div className="filterss" id="post-search" onClick={handlePost}>
                Post
              </div>
            </div>
            {searchPeople && (
              <div>
                <div style={{ margin: "15px 0px" }}>Filters : </div>
                <div className="filterBY">
                  <button
                    onClick={addCollegeFilter}
                    style={{ background: "red" }}
                    className={
                      collegeFilter ? "colored-filter-btn" : "filter-btn"
                    }
                  >
                    College / University
                  </button>
                  <button
                    onClick={addDegreeFilter}
                    style={{ background: "blue" }}
                    className={
                      degreeFilter ? "colored-filter-btn" : "filter-btn"
                    }
                  >
                    Degree
                  </button>
                  <button
                    onClick={addCompanyFilter}
                    style={{ background: "green" }}
                    className={
                      companyFilter ? "colored-filter-btn" : "filter-btn"
                    }
                  >
                    Company
                  </button>
                  <button
                    onClick={addJobFilter}
                    style={{ background: "orange" }}
                    className={jobFilter ? "colored-filter-btn" : "filter-btn"}
                  >
                    Job Title
                  </button>
                  <button
                    onClick={addLocationFilter}
                    style={{ background: "purple" }}
                    className={
                      locationFilter ? "colored-filter-btn" : "filter-btn"
                    }
                  >
                    Location
                  </button>
                </div>
                <div className="filterInput">
                  {collegeFilter && (
                    <input
                      name="college"
                      value={filterFields.college}
                      onChange={(e) => {
                        onChangeFilter(e);
                      }}
                      placeholder="College / University / School"
                      type="text"
                    />
                  )}
                  {degreeFilter && (
                    <input
                      name="degree"
                      value={filterFields.degree}
                      onChange={(e) => {
                        onChangeFilter(e);
                      }}
                      placeholder="Degree"
                      type="text"
                    />
                  )}
                  {companyFilter && (
                    <input
                      name="company"
                      value={filterFields.company}
                      onChange={(e) => {
                        onChangeFilter(e);
                      }}
                      placeholder="Company"
                      type="text"
                    />
                  )}
                  {jobFilter && (
                    <input
                      name="job"
                      value={filterFields.job}
                      onChange={(e) => {
                        onChangeFilter(e);
                      }}
                      placeholder="Job Title"
                      type="text"
                    />
                  )}
                  {locationFilter && (
                    <input
                      name="location"
                      value={filterFields.location}
                      onChange={(e) => {
                        onChangeFilter(e);
                      }}
                      placeholder="Location"
                      type="text"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Search by post */}
      {!searchPeople && (
        <div className="filtered-search-results">
          {setUsers.length > 0
            ? setUsers.map((val, i) => (
              <>
                <div
                  className="sresult-1"
                  key={i}
                  onClick={() => navigate(`/public-profile/${val._id}`)}
                  style={{ borderBottom: "1px solid gray" }}
                >
                  <img
                    src={
                      searchPeople
                        ? val.profilePicUrl
                          ? val.profilePicUrl
                          : user
                        : val.imageUrls[0]
                          ? val.imageUrls[0]
                          : "/post-img.png"
                    }
                    className="searched-user"
                    alt="profile"
                  />
                  <div className="searched-user-details">
                    <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                      {val.title.slice(0, 200) + "..."}
                    </div>
                  </div>
                </div>
              </>
            ))
            : filterFields.keyword.length !== 0 && (
              <h2>No search results for "{filterFields.keyword}"</h2>
            )}
        </div>
      )}

      {/* Search by people */}
      {searchPeople && (
        <div className="filtered-search-results">
          {setUsers.length > 0
            ? setUsers.map((val, i) => (
              <>
                <div
                  className="sresult-1"
                  key={i}
                  onClick={() => navigate(`/public-profile/${val._id}`)}
                >
                  <img
                    src={val.profilePicUrl ? val.profilePicUrl : user}
                    className="searched-user"
                    alt="profile"
                  />
                  <div className="searched-user-details">
                    <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                      {val.firstname + " " + val.lastname}
                    </div>

                    {<div>{val.skills.join(" || ")}</div>}
                    {val.skills.join(" ").length >= 12 ? (
                      <span
                        style={{ color: "rgb(1,124,206)", width: "40px" }}
                      >
                        More...
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="searched-results-partition"></div>
              </>
            ))
            : filterFields.keyword.length !== 0 && (
              <h2>
                No search results for "{filterFields.keyword}" for applied
                filters
              </h2>
            )}
        </div>
      )}
      {/* <RightProfileComp /> */}
    </>
  );
}

export default Searchbar;
