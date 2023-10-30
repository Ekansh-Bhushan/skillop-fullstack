import React, { useReducer } from 'react'
import StarRating from './starRating'
import MyComponent from './option'
import './feedbackForm.css'
// const preSetFeedback = {
//     list: [
//         { title: 'lorem ipsum', flag: false},
//         { title: 'lorem ipsum', flag: false},
//         { title: 'lorem ipsum', flag: false},
//         { title: 'lorem ipsum', flag: false},
//         { title: 'lorem ipsum', flag: false},
//         { title: 'lorem ipsum', flag: false},
//         { title: 'lorem ipsum', flag: false},
//     ]
// }

// function reducer(state,action){
//     switch(action.type){
//         case 'ON_SELECT':
//             return {...state, ...action.payload}
//         default:
//             return state
//     }
// }


function feedbackForm() {

    
    // const[state,dispatch] = useReducer(reducer, initialState)
  return (
    <div className='form'>
        <div>

        <h1>Mentor Feedback Form</h1>
        <h2>How Was Your Experience With</h2>
        <h2> Your Mentor</h2>
        </div>
        <div>

      <StarRating/>
        </div>
        <div className='what' >
            What Went Wrong
        </div>
    
        <div className='myoptions'>
            <MyComponent/>
        </div>
        <form>
        <input className='inp'
                                style={{
                                    border: "2px solid #3333",
                                    outline: "none",
                                    width: "50%",
                                    height: "100px",
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    color: "black",
                                    margin:"50px",
                                    position:'relative',
                                    left:"35px",
                                    backgroundColor: "transparent",
                                    padding: "10px",
                                }}
                            />

<button
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (e.target.previousSibling.value === "")
                                        return;
                                    
                                }}
                                style={{
                                    backgroundColor: "#108CFF",
                                    color: "white",
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    border: "none",
                                    outline: "none",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    marginLeft: "10px",
                                }}
                            >
                                <div className='sub'>Submit </div>
                            </button>
        </form>
    </div>
  )
}

export default feedbackForm
