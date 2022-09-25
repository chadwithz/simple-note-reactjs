import React, { useState, useEffect } from "react";
import { setData } from "./Redux/Slicer/AppState";
import { useDispatch, useSelector } from "react-redux";
import { db } from "./Firebase";
import { collection, getDocs, addDoc } from "firebase/firestore/lite";
const notesCol = collection(db, "notes");

function App() {
  const dispatch = useDispatch();
  const Data = useSelector((state) => state.AppState);
  const { data } = Data;
  const [changeState, setChangeState] = useState(false);
  const [input, setInput] = useState("");

  const getData = async () => {
    const notesSnapshot = await getDocs(notesCol);
    const notesList = notesSnapshot.docs.map((doc) => doc.data());
    let temp = [...data];
    temp = notesList;
    dispatch(setData(temp));
  };

  useEffect(() => {
    getData();
  }, [data]);

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
        {data.map((val, index) => (
          <li onClick={() => {}} key={`${index}-list`}>
            {val.value}
          </li>
        ))}
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
                await addDoc(collection(db, "notes"), {
                  value: input,
                });
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
