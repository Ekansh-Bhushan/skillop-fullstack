import React from "react";
import Header1 from "../Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Pageloader from "../Pagesbar";
import { updateProfile } from "../../api/userRequest";
import { toast } from "react-hot-toast";
import axios from "axios";
import './index.css';

function Auth5Component({ setProgress }) {
  const handleBack = () => {
    setProgress(35);
    setTimeout(() => {
      setProgress(100);
    }, 300);
    navigate("/jobtitles");
  };

  let [data, setData] = useState([
    {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      country: "",
      state: "",
      city: "",
    },
  ]);

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedClg, setSelectedClg] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    let { name, value } = e.target;
    
    setData((prevData) => [
      {
        ...prevData[0],
        [name]: value,
      },
    ]);
  };
  

  const addEdu = async () => {
    try {
      let formdata = new FormData();
      formdata.append("education", JSON.stringify(data));
      // console.log("data", JSON.stringify(data));
      await updateProfile(formdata);
      // console.log("succcess");
    } catch (err) {
      // console.log("failed");
      console.log("Unable to update profile at the moment! ", err);
    }
  };

  const redirectToPage6 = async () => {
    if (data[0].institution === "" || data[0].city === "" || data[0].state === "" || data[0].endDate === "" || data[0].startDate === "" || data[0].degree === "" ) {
      toast.error("Select your college, degree and graduation year!");
      return;
    }
    if(data[0].endDate < data[0].startDate) {
      toast.error("End year cannot be less than start year!");
      return;
    }
    addEdu();
    setProgress(35);
    setTimeout(() => {
      setProgress(100);
    }, 300);
    navigate("/pic");
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [collegeSearchResults, setCollegeSearchResults] = useState([]);

  const searchCollege = async (qrr) => {
    try {
      const { data } = await axios.get(`https://app.skillop.in/api/college/info?college=${qrr}`, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      setCollegeSearchResults(data.result);
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleOnChange = (e) => {
    setSearchQuery(e.target.value); 
    document.querySelector('.college-search-results').style.display = 'block';
    searchCollege(e.target.value);
    if(e.target.value.length === 0) {
      document.querySelector('.college-search-results').style.display = 'none';
    }
  }

  const handleCollegeSelection = (clg_details) => {
    setSelectedClg(clg_details.college);
    setSelectedCity(clg_details.city);
    setSelectedState(clg_details.state);
    setData((prevData) => [
      {
        ...prevData[0],
        "institution": clg_details.college,
        "city": clg_details.city,
        "state": clg_details.state
      },
    ]);
    document.querySelector('.college-search-results').style.display = 'none';
  }

  return (
    <>
      <Header1 />
      <div className="main-5">
        <Pageloader
          givecolor1={false}
          givecolor2={false}
          givecolor3={false}
          givecolor4={true}
          givecolor5={true}
          givecolor6={true}
          isactive4={true}
        />
        <div className="head-5">
          <h2>Select your College or University</h2>
        </div>
        <div className="search-college">
          <input id="search-college" type="text" onChange={handleOnChange} value={searchQuery} placeholder="Search your college, university or insititution" />
          <div className="college-search-results">
            {(collegeSearchResults.length > 0) ? collegeSearchResults.map((college, idx) => {
              return (<div key={idx} id="college-result" onClick={()=> handleCollegeSelection(college)}>
                <h3>{college.college}</h3>
                <p>{college.city}{", "}{college.state}</p>
              </div>);
            }) : searchQuery.length > 0 && `No results found for "${searchQuery}"`}
          </div>
          <p id="note-search" style={{marginTop:"15px"}}>Note :  If your college is not found in search, enter it below manually</p>
        </div>
        <form
          id="collegedetl"
          className="details-college"
          onSubmit={redirectToPage6}
        >
          <div className="college-name">
            <div className="college">
              <label style={{ fontWeight: "bold" }} htmlFor="college">
                College / School
              </label>
              <input
                name="institution"
                value={data[0].institution}
                id="college"
                className="college-choices"
                onClick={(Event) => {
                  onChange(Event);
                }}
                onChange={(Event) => {
                  onChange(Event);
                }}
                required
              >
              </input>
            </div>
            
            <div className="city">
              <label style={{ fontWeight: "bold" }} htmlFor="city">
                City
              </label>
              <input
                name="city"
                type="text"
                value={data[0].city}
                id="city"
                className="city-choices"
                onChange={(Event) => {
                  onChange(Event);
                }}
                required
              >
              </input>
            </div>

            <div className="state">
              <label style={{ fontWeight: "bold" }} for="state">
                State
              </label>
              <input
                name="state"
                type="text"
                value={data[0].state}
                className="state-choices"
                id="state"
                onChange={(Event) => {
                  onChange(Event);
                }}
                required
                
              >
              </input>
            </div>
            
          </div>
          <div className="year-details">
            <div className="degree">
              <label style={{ fontWeight: "bolder" }} for="degree">
                Degree:
              </label>
              <input
                name="degree"
                onChange={onChange}
                value={data[0].degree}
                type="text"
                class="degree-choices"
                required
              />
            </div>
            <div className="fieldOfStudy">
              <label style={{ fontWeight: "bolder" }} for="fieldOfStudy">
                Field of Study:
              </label>
              <input
                name="fieldOfStudy"
                onChange={onChange}
                value={data[0].fieldOfStudy}
                type="text"
                class="study-choices"
              />
            </div>
            <div className="gradyear">
              <label style={{ fontWeight: "bolder" }} for="grad">
                Start Year:
              </label>
              <input
                name="startDate"
                onChange={onChange}
                value={data[0].startDate}
                type="number"
                class="start-choices"
                min={1900}
                required
              />
            </div>
            <div className="gradyear">
              <label style={{ fontWeight: "bolder" }} for="grad">
                End Year (or expected):
              </label>
              <input
                name="endDate"
                onChange={onChange}
                value={data[0].endDate}
                type="number"
                class="end-choices"
                min={1900}
                required
              />
            </div>
          </div>
          <div className="main-5-btnCont">
            <button onClick={handleBack} className="back">
              Back
            </button>
            <button
              htmlFor="collegedetl"
              type="submit"
              className="nextbtn-5"
              onClick={redirectToPage6}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Auth5Component;
