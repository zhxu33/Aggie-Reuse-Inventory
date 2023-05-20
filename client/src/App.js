import React from "react";
import './App.css'

function App() {
  let items = [{name: "T-shirt1", description: "blue"}, {name: "T-shirt2", description: "green"}, {name: "T-shirt3", description: "blue"}]
  return <div class="flex-container">
  {items.map((item) => (
        <div>
          <h10>{item.name}</h10>
          <h5>{item.description}</h5>
          </div>
      ))}
  <div></div>
  <div></div>
  <div></div>  
  <div></div>
  <div></div>  
  <div></div>
  

  
</div>
}

export default App;
