import React from 'react'; //imports virtaul doms, etc
import logo from './logo.svg';
import "./App.css";


function App(){  //This is a function based component
  return(
    //Uses JSX and not HTML. They look the same.
    //Can return only only element. So a hack is to wrap everything in a <div> element.
    //Every element MUST end. e.g. <h1> must have </h1>. In case of <br>, we write <br /> instead of just <br>
    //React doesn't have class="" attributes. Instead we have to use className=""
    <div className="App"> 
      <header className="App-header">
        <img src = {logo} className="App-logo" />
        <p>Ameya is new to React</p>
      </header>
    </div>  
  );
}

export default App; // exports the App outside

