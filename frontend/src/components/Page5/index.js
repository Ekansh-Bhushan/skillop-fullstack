import React, { useEffect } from "react";
import index from "./index.css";
import Header1 from "../Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateIsMentor } from "../../api/userRequest";
import Pageloader from "../Pagesbar";
import { getcity, getcollege, getstate } from "../../api/college";
import { updateProfile } from "../../api/userRequest";
import { toast } from "react-hot-toast";

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

  const onChange = (e) => {
    let { name, value } = e.target;
    setData((prevData) => [
      {
        ...prevData[0],
        [name]: value,
      },
    ]);
    console.log("data", data);
  };

  const addEdu = async () => {
    try {
      let formdata = new FormData();
      formdata.append("education", JSON.stringify(data));
      console.log("data", formdata);
      await updateProfile(formdata);
      console.log("succcess");
    } catch (err) {
      console.log("failed");
      console.log("Unable to update profile at the moment! ", err);
    }
  };

  const [state, setState] = useState([]);
  const [stateselected, setStateselected] = useState("");
  const [city, setCity] = useState([]);
  const [college, setCollege] = useState([]);

  const navigate = useNavigate();

  const getallstates = async () => {
    try {
      const { data } = await getstate();
      // console.log(data)
      setState(data.result);
    } catch (err) {
      console.log("error");
    }
  };

  useEffect(() => {
    getallstates();
  }, []);

  const getallcities = async (state) => {
    try {
      const { data } = await getcity(state);
      // console.log(data)
      setCity(data.result);
    } catch (err) {
      console.log("error");
    }
  };

  const getallcolleges = async (state, city) => {
    try {
      const { data } = await getcollege(state, city);
      // console.log(data)
      setCollege(data.result);
    } catch (err) {
      console.log("error");
    }
  };

  const citydone = (event) => {
    getallcities(event.target.value);
    setStateselected(event.target.value);
    setSelectedState(event.target.value);
  };

  const collegedone = (event) => {
    console.log(stateselected);
    getallcolleges(stateselected, event.target.value);
    console.log(event.target.value);
    setSelectedCity(event.target.value);
  };

  const clgdone = (event) => {
    setSelectedClg(event.target.value);
  };

  const redirectToPage6 = async () => {
    addEdu();
    if (!stateselected || !city) {
      toast.error("Select state, city, college and graduation year!");
      return;
    }
    setProgress(35);
    setTimeout(() => {
      setProgress(100);
    }, 300);
    navigate("/pic");
  };

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
          <h2>Select your College / University / School</h2>
        </div>
        <form
          id="collegedetl"
          className="details-college"
          onSubmit={redirectToPage6}
        >
          <div className="college-name">
            <div className="state">
              <label style={{ fontWeight: "bold" }} for="state">
                State
              </label>
              <select
                name="state"
                value={selectedState}
                className="state-choices"
                id="state"
                onChange={(Event) => {
                  citydone(Event);
                  onChange(Event);
                }}
                required
                defaultValue="STATE"
              >
                {state.map((x) => {
                  return (
                    <option
                      value={x.toString().toUpperCase()}
                      className="options"
                    >
                      {" "}
                      {x.toString().toUpperCase()}{" "}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="city">
              <label style={{ fontWeight: "bold" }} htmlFor="city">
                City
              </label>
              <select
                name="city"
                value={selectedCity}
                id="city"
                className="city-choices"
                onChange={(Event) => {
                  collegedone(Event);
                  onChange(Event);
                }}
                required
              >
                {city.map((y) => {
                  return (
                    <option
                      value={y.toString().toUpperCase()}
                      className="options"
                    >
                      {y.toString().toUpperCase()}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="college">
              <label style={{ fontWeight: "bold" }} htmlFor="college">
                College / School
              </label>
              <select
                name="institution"
                value={selectedClg}
                id="college"
                className="college-choices"
                onChange={(Event) => {
                  clgdone(Event);
                  onChange(Event);
                }}
                required
              >
                {college.map((z) => {
                  return (
                    <option
                      value={z.toString().toUpperCase()}
                      className="options"
                    >
                      {z.toString().toUpperCase()}
                    </option>
                  );
                })}
              </select>
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
                min={1950}
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
                min={1950}
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
