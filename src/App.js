import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "./Redux/Slicer/Notes";

function App() {
  const dispatch = useDispatch();
  const Data = useSelector((state) => state.Notes);
  // const { data } = Data;
  const [changeState, setChangeState] = useState(false);
  const [input, setInput] = useState("");

  const getData = async () => {
    await dispatch(getNotes()).unwrap();
  };

  useEffect(() => {
    getData();
    console.log("Data >>> ", Data);
  }, []);

  return (
    <main
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1 style={{ alignSelf: "center" }}> Todo </h1>
      <ul>
        {/* {data.map((val, index) => ( */}
        {/*   <li onClick={() => {}} key={`${index}-list`}> */}
        {/*     {val.value} */}
        {/*   </li> */}
        {/* ))} */}
        <li>
          {!changeState ? (
            <button
              style={{
                fontWeight: "bold",
                padding: "4px 8px",
              }}
              onClick={() => {
                setChangeState(true);
              }}
            >
              &#43;
            </button>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setInput("");
                setChangeState(false);
              }}
              style={{ display: "flex" }}
            >
              <input onChange={(e) => setInput(e.target.value)} />
              <button type="submit">submit</button>
              <button
                onClick={() => {
                  setInput("");
                  setChangeState(false);
                }}
              >
                cancel
              </button>
            </form>
          )}
        </li>
      </ul>
    </main>
  );
}

export default App;
