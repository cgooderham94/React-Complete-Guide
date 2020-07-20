import React from 'react';
import classes from './Cockpit.css';

const cockpit = (props) => {
    const assignedClasses = [];
    let btnClass = '';

    if (props.showPersons) {
        btnClass = classes.Red;
    }

    if(props.persons.length <= 2) {
        assignedClasses.push('red');
    }

    if (props.persons.length <= 1) {
        assignedClasses.push('bold');
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>

            <p className={assignedClasses.join(" ")}>It's amazing right? I'm working!</p>

            {/* This is binding the context of the class 'App' to the function. It also passes 'Charles' as an
                    argument to the switchNameHandler function */}
            <button className={btnClass} onClick={props.clicked}>Toggle Persons</button>
        </div>
    );
}

export default cockpit;