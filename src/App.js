import React, { Component } from 'react';
// Importing the useState hook for 'function' based components
// import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
    // The state property is only available within class-based components that extend the React Component class.
    // Be careful using state though, it can quickly become unpredictable and difficult to manage if it's used
    // throughout lots of components in your app.
    state = {
        persons: [
            { name: 'Charlie', age: 25 },
            { name: 'Max', age: 28 },
            { name: 'Amy', age: 24 }
        ],
        otherState: 'Some other value',
        showPersons: false
    };

    // Handler convention is useful here to denote that this method is not being actively called, but rather, on an event.
    switchNameHandler = (newName) => {
        // DONT DO THIS -> this.state.persons[0].name = "Charles";

        // setState is a special method that allows the state object to be updated, and where possible, merges data.
        this.setState({
            persons: [
                { name: newName, age: 25 },
                { name: 'Max', age: 28 },
                { name: 'Amy', age: 27 }
            ]
        })
    };

    // This handler is invoked on text input 'onChange' event. It grabs the value of the text input.
    nameChangedHandler = (event) => {
        this.setState({
            persons: [
                { name: 'Charlie', age: 25 },
                { name: event.target.value, age: 28 },
                { name: 'Amy', age: 27 }
            ]
        })
    };

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({showPersons: !doesShow});
        console.log("hello!")
    };

    render() {
        const style = {
            padding: '0.5rem',
            border: '1px solid green',
            borderRadius: '4px',
            backgroundColor: '#DDD',
            font: 'inherit',
            cursor: 'pointer'
        };

        return (
            // Here, we shouldn't try to render adjacent elements. JSX is built to render elements with a single container.
            <div className="App">
                <h1>Hi, I'm a React app.</h1>

                {/* This is binding the context of the class 'App' to the function. It also passes 'Charles' as an
                argument to the switchNameHandler function */}
                <button style={style}
                        onClick={this.togglePersonsHandler}>Toggle Persons</button>

                {/* React doesn't have directives like Vue (v-if). Instead, we use a simple because evaluation to render */}
                { this.state.showPersons === true ?
                    <div>
                        {/* Importing the 'Person' component using custom 'props' on each i.e. 'name' and 'age' */}
                        {/* 'Props' are how we pass data down into the component. Changes in these props can trigger a UI update */}
                        <Person
                            name={this.state.persons[0].name}
                            age={this.state.persons[0].age} />

                        {/* It is possible to pass a method down into a component by setting it as a prop. This is a common pattern
                        in react apps and allows the component to still alter state, without being 'stateful' itself. */}
                        <Person
                            name={this.state.persons[1].name}
                            age={this.state.persons[1].age}

                            /* This is an alternative to binding the context to the switchNameHandler function. Be aware,
                            though, it's not as performant so use it wisely (React can sometimes re-render things too often.
                            While we wouldn't ordinarily 'call' the function in the prop, when using an arrow function, it
                            implicitly adds a 'return' before the function body. Hence, the function wont actually get called
                            until a click is registered. */
                            click={() => this.switchNameHandler('Maximillian!!')}
                            changed={this.nameChangedHandler}>My hobbies: Riding my motorbike</Person>

                        <Person
                            name={this.state.persons[2].name}
                            age={this.state.persons[2].age} />
                    </div> : null
                }
            </div>
        );

        // This is essentially what the render() call above does using JSX.
        // return(React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React app.')));
    }
}

/* FUNCTION BASED ALTERNATIVE - The below is the 'hook' based approach to updating state via functional based components.
 It's the most current way of handling state, but is not the most adopted. */

// const app = props => {
//     // The useState() 'hook' function allows us to add state to our components. It always returns exactly two elements.
//     // The first is the state object, the second is a function that allows you to update the state.
//
//     // One of the big caveats of using functional based components, is that unlike class based components, state is replaced
//     // when it is updated. Therefore, it is your job to ensure you include all old state data.
//     const [ personsState, setPersonsState ] = useState({
//         persons: [
//             { name: 'Charlie', age: 25 },
//             { name: 'Max', age: 28 },
//             { name: 'Amy', age: 24 }
//         ]
//         // Below would get overwritten if only the persons array was updated on setPersonsState
//         // otherState: 'Some other value'
//     });
//
//     // In order to prevent state data getting replaced accidentally, it is perhaps better to use multiple useState()
//     // function calls, with destructuring, to ensure the data isn't lost.
//     const [othersState, setOthersState] = useState('Some other value');
//
//     console.log(personsState, othersState);
//
//     // Handler convention is useful here to denote that this method is not being actively called, but rather, on an event.
//     const switchNameHandler = () => {
//         // DONT DO THIS -> personsState.persons[0].name = "Charles";
//
//         setPersonsState({
//             persons: [
//                 { name: 'Charles', age: 25 },
//                 { name: 'Max', age: 28 },
//                 { name: 'Amy', age: 27 }
//             ]
//         });
//
//         setOthersState('Now I\'ve changed state');
//     }
//
//     return (
//         // Here, we shouldn't try to render adjacent elements. JSX is built to render elements with a single container.
//         <div className="App">
//             <h1>Hi, I'm a React app.</h1>
//
//             <button onClick={switchNameHandler}>Switch Name</button>
//
//             {/* Importing the 'Person' component using custom 'props' on each i.e. 'name' and 'age' */}
//             {/* 'Props' are how we pass data down into the component. Changes in these props can trigger a UI update */}
//             <Person name={personsState.persons[0].name} age={personsState.persons[0].age} />
//             <Person name={personsState.persons[1].name} age={personsState.persons[1].age} >My hobbies: Riding my motorbike</Person>
//             <Person name={personsState.persons[2].name} age={personsState.persons[2].age} />
//         </div>
//     );
//
//     // This is essentially what the render() call above does using JSX.
//     // return(React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React app.')));
// }

export default App;
