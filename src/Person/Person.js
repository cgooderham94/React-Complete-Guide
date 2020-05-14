import React from 'react';

/* This is an example of a 'stateless' component as it only outputs external data. It's good to use as many stateless
components as possible. Keeping a minimal amount of 'stateful' components makes the app much easier to maintain and
keeps a clear flow of data from the 'stateful' container component, down to the 'stateless' presentational component. */

// Props are passed into the call for the component i.e. <person name="Charlie" age="25" />
const person = (props) => {
    //  Using the curly braces, we can evaluate single line expressions.
    return (
        <div>
            <p onClick={props.click}>I'm a {props.name} and I am {props.age} years old!.</p>

            {/* Children is a reserved word. It outputs any elements passed in between the opening and closing tags
            of the component usage */}
            <p onClick={props.click}>{props.children}</p>
        </div>
    )
};

export default person;