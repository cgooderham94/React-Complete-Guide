import React from 'react';
import './Person.css';
import Radium from "radium";

/* This is an example of a 'stateless' component as it only outputs external data. It's good to use as many stateless
components as possible. Keeping a minimal amount of 'stateful' components makes the app much easier to maintain and
keeps a clear flow of data from the 'stateful' container component, down to the 'stateless' presentational component. */

// Props are passed into the call for the component i.e. <person name="Charlie" age="25" />
const person = (props) => {
    const style = {
        '@media (min-width: 576px)': {
            width: '450px'
        }
    }

    //  Using the curly braces, we can evaluate single line expressions.
    return (
        <div className="Person" style={style}>
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!.</p>

            {/* Children is a reserved word. It outputs any elements passed in between the opening and closing tags
            of the component usage */}
            <p onClick={props.click}>{props.children}</p>

            {/* Without the value attribute here, you'd force the component into being 'read-only'. However, with the
            onChange event added, you now have a two-way binding. This both allows the initial value to be a prop, but
            also allow it to be dynamically updated too. */}
            <input type="text" onChange={props.changed} value={props.name} />
        </div>
    )
};

export default Radium(person);