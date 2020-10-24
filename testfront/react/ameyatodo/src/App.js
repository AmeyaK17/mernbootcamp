import React from 'react';
import logo from './iron-man-6.png';
import "./App.css";


class App extends React.Component {  //This is a class based component

    constructor(props) {
        super(props); //Part of the constructor's syntax
        this.state = { //we define a state
            newItem: "",
            list: [],
        }
    }

    addItem(todoValue) {
        if(todoValue !== "") {
            const newItem = {
                id: Date.now(),
                value: todoValue,
                isDone: false,
            };
            const list = [...this.state.list]; // ... means append all the values 
            list.push(newItem);

            this.setState({  // Whenever accessing states in react, MUST use setState() function. A state should only be accessed via this function and NEVER directly. These are REACT norms.
                list, // same name for list, so we just wrote list. Can also write list: list. It is the same thing
                newItem: ""
            })
        }
    }

    deleteItem(id) {
        const list = [...this.state.list];
        const updatedlist = list.filter(item => item.id !== id);
        this.setState({
            list: updatedlist
        })
    }

    updateInput(input){
        this.setState({newItem: input});
    }

    render() {
        return (
            //Always returns JSX
           <div>
               <img src={logo} width="100" height="100" className="logo" />
               <h1 className="app-title">Ameya's ToDo App</h1>
               <div className="container">
                   Add an item ...
                   <br />
                   <input type="text" 
                        className="input-text" 
                        placeholder="Write a todo" 
                        required 
                        value={this.setState.newItem} //line 1
                        onChange={e => this.updateInput(e.target.value)} //line 2
                    />
                   <button 
                        className="add-btn"
                        onClick = {() => this.addItem(this.state.newItem)} //line 1 and 2 were so that we could implement this line
                        disabled = {!this.state.newItem.length} //length is treated as 0. So if there is nothing in newItem of state, then the button will be disabled.
                   >Add Todo</button>
                   <div className="list">
                       <ul>
                           {this.state.list.map(item => {
                               return (
                                   <li key={item.id}>
                                       <input 
                                            type="checkbox"
                                            name="isDone"
                                            checked={item.isDone}
                                            onChange={() => {}}
                                        />
                                        {item.value}
                                        <button 
                                            className="btn"
                                            onClick={() => this.deleteItem(item.id)}
                                        >
                                            Delete
                                        </button>
                                   </li>
                               );
                           })}
                           <li>
                               <input type="checkbox" name="" id="" />
                               Record Youtube videos
                               <button className="btn">Delete</button>
                           </li>
                       </ul>
                   </div>
               </div>
           </div>
        );
    }
}

export default App;