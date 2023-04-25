import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [object, setObject] = useState([{}]);

  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then((response) => response.json())
      .then((object) => {
        setObject(object);
      });
  }, []);

  function owlBotSubmit() {
    alert("it worked");
    let newPosition = {
      owlbot: "5",
    };

    fetch("http://localhost:5000/postRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPosition),
    }).then(console.log(newPosition));
  }

  return (
    <body>
      <h1 id="heading">CONTROL THE OWLBOT!</h1>
      <input />
      <br />
      <button onClick={() => owlBotSubmit()}>SUBMIT</button>
    </body>
  );
}
export default App;
