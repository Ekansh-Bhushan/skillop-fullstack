import React, { useReducer } from "react";
import "./option.css";

const preSetFeedback = {
  list: [
    { title: "Polite Attitude", flag: false },
    { title: "Punctual", flag: false },
    { title: "Effective Conversation", flag: false },
    { title: "Helpful", flag: false },
    { title: "Satisfactory", flag: false },
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
  let feedback = "";
  return (
    <div className="all-box">
      {state.list.map((item, index) => (
        <div
          className="flex items-center justify-center p-5 border-2 m-2 rounded-xl"
          key={index}
          style={{
            backgroundColor: `${item.flag ? "cyan" : "white"}`,
            height: "50px", // Set a smaller height
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
