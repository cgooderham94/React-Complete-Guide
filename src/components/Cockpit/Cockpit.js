import React, { useEffect, useRef } from 'react';
import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';

const cockpit = props => {
    // This is how you can set references in functional components.
    const toggleButtonRef = useRef(null);

    // useEffect combines componentDidMount and componentDidUpdate together in one React Hook.
    useEffect(() => {
        console.log('[Cockpit.js] useEffect');

        toggleButtonRef.current.click();

        /* This cleanup work gets executed when the component is destroyed (or when data changes if data is added to
        the array), as a result of the empty array as the second argument in the useEffect call */
        return () => {
            console.log('[Cockpit.js] Cleanup work in useEffect');
        };
    }, []);

    useEffect(() => {
        console.log('[Cockpit.js] 2nd useEffect');

        /* This cleanup work gets executed on every update cycle, as a result of no second argument in
        the useEffect call */
        return () => {
            console.log('[Cockpit.js] cleanup work in 2nd useEffect');
        }
    });

    /* It's possible to have as many useEffect function calls as desired.
    useEffect(); */

    const assignedClasses = [];
    let btnClass = '';

    if (props.showPersons) {
        btnClass = classes.Red;
    }

    if(props.personsLength <= 2) {
        assignedClasses.push('red');
    }

    if (props.personsLength <= 1) {
        assignedClasses.push('bold');
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>

            <p className={assignedClasses.join(" ")}>It's amazing right? I'm working!</p>

            {/* This is binding the context of the class 'App' to the function. It also passes 'Charles' as an
                    argument to the switchNameHandler function */}
            <button ref={toggleButtonRef} className={btnClass} onClick={props.clicked}>Toggle Persons</button>

            <AuthContext.Consumer>
                {(context) => <button onClick={context.login}>Log in</button>}
            </AuthContext.Consumer>
        </div>
    );
}

// React.memo() 'memoizes' the cockpit component and only updates if it's props change. Useful for functional components.
export default React.memo(cockpit);