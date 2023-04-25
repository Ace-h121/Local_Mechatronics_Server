import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  if (true){
    return (
      <>
      <body>
        <h1>
          CONTROL THE OWLBOT!
        </h1>
        <input/>
        <br/>
        <button onClick={()=>console.log("itworked")}>
          SUBMIT
        </button>
      </body>
  
      </>
    )
  }

  const handleClick = () => console.log("it worked");
  return (
    <>
      {typeof data.users === "undefined" ? (
        <p>loading...</p>
      ) : (
        data.users.map((user, i) => <p key={i}>{user}</p>)
      )}
        <button onClick={handleClick}> </button>
    </>
  );
}
export default App;
