import React, { useReducer } from "react";
import "./option.css";
const preSetFeedback = {
  list: [
    { title: "easy navigation", flag: false },
    { title: "user experience", flag: false },
    { title: "mobile friendliness", flag: false },
    { title: "immersive visual experience", flag: false },
    { title: "user friendly ", flag: false },
    { title: "Speed", flag: false },

  ],
};

function reducer(state, action) {
  switch (action.type) {
    case "ON_SELECT":
      return { ...state, list: action.payload };
    default:
      return state;
  }
}

function MyComponent() {
  const [state, dispatch] = useReducer(reducer, preSetFeedback);

  function selectItem(item, index) {
    state.list[index].flag = !state.list[index].flag;
    dispatch({
      type: "ON_SELECT",
      payload: state.list,
    });
  }
  return (
    <div className="all-box">
      {state.list.map((item, index) => (
        <div
          className="box"
          key={index}
          style={{
            backgroundColor: `${item.flag ? "cyan" : "white"}`,
          }}
          onClick={() => selectItem(item, index)}
        >
          <p
            style={{ margin: "0px", color: `${item.flag ? "white" : "black"}` }}
          >
            {item.title}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MyComponent;
