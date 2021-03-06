import React, { Component } from 'react';
import classes from './App.css';

import Cockpit from '../components/Cockpit/Cockpit';
import Persons from '../components/Persons/Persons';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Aux';
import AuthContext from '../context/auth-context';

class App extends Component {
    constructor(props) {
        super(props);
        console.log('[App.js] constructor');
    }

    // The state property is only available within class-based components that extend the React Component class.
    // Be careful using state though, it can quickly become unpredictable and difficult to manage if it's used
    // throughout lots of components in your app.
    state = {
        persons: [
            { id: 'asdikh', name: 'Charlie', age: 25 },
            { id: 'asf', name: 'Max', age: 28 },
            { id: 'asgtqw', name: 'Amy', age: 24 }
        ],
        otherState: 'Some other value',
        showPersons: false,
        showCockpit: true,
        changedCounter: 0,
        authenticated: false
    };

    static getDerivedStateFromProps(props, state) {
        console.log('[App.js] getDerivedStateFromProps', props);
        return state;
    }

    componentWillMount() {
        console.log('[App.js] componentWillMount');
    }

    componentDidMount() {
        console.log('[App.js] componentDidMount');
    }

    shouldComponentUpdate() {
        console.log('[App.js] shouldComponentUpdate');
        return true;
    }

    componentDidUpdate() {
        console.log('[App.js] componentDidUpdate');
    }

    // This handler is invoked on text input 'onChange' event. It grabs the value of the text input.
    nameChangedHandler = (event, id) => {
        /* Find the person who's data is being changed, using their array index */
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        });

        // 'Spread' the person object who's data we've changed into a new object
        const person = {
            ...this.state.persons[personIndex]
        };

        // Set the inputs value as the persons name
        person.name = event.target.value;

        // Spread the existing persons array into a new one and add the updated persons data
        const persons = [...this.state.persons];
        persons[personIndex] = person;

        // Set the state to the new persons array
        this.setState((prevState, props) => {
            return {
                persons: persons,
                // This is not a reliable way updating the state, because there's no guarantee the state will update
                // straight away, or, be affected by a setState() elsewhere.
                // changedCounter: this.state.changedCounter + 1
                changedCounter: prevState.changedCounter + 1
            }
        })
    };

    deletePersonHandler = (personIndex) => {
        // This sets a reference to React's original array of persons. It is highly recommended not to manipulate
        // original data, but rather a copy of the data (shown under the bad example). Splicing without arguments simply
        // creates a duplicate array.
        // const persons = this.state.persons;
        const persons = [...this.state.persons];
        persons.splice(personIndex, 1);
        this.setState({persons: persons});
    };

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({showPersons: !doesShow});
    };

    loginHandler = () => {
        this.setState({authenticated: true});
    }

    render() {
        console.log('[App.js] render');

        let persons = null;

        if (this.state.showPersons) {
            persons = (<Persons
                    persons={this.state.persons}
                    clicked={this.deletePersonHandler}
                    changed={this.nameChangedHandler}
                    isAuthenticated={this.state.authenticated}/>
            );
        }

        return (
            <Aux>
                <button
                    onClick={() => {
                        this.setState({showCockpit: false})
                    }}>
                    Remove Cockpit
                </button>

                <AuthContext.Provider value={{
                    authenticated: this.state.authenticated,
                    login: this.loginHandler
                }} >
                    { this.state.showCockpit ? <Cockpit
                        title={this.props.appTitle}
                        showPersons={this.state.showPersons}
                        personsLength={this.state.persons.length}
                        clicked={this.togglePersonsHandler}
                        login={this.loginHandler}/> : null }

                    { /* This is a much cleaner and tidier way of outputting conditional content. It keeps the core return of
                    this class clean and readable. */ }
                    {persons}
                </AuthContext.Provider>
            </Aux>
        );

        // This is essentially what the render() call above does using JSX.
        // return(React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React app.')));
    }
}

/* This way of wrapping a component in a higher order component ('withClass') is best used where you want to add
*logic*, not JSX. Otherwise, best to wrap the markup using a JSX component. */
export default withClass(App, classes.App);
