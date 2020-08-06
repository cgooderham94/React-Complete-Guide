import React, { Component, Fragment } from 'react';

import Aux from '../../../hoc/Aux';
import classes from './Person.css';
import PropTypes from 'prop-types';

import withClass from '../../../hoc/withClass';
import AuthContext from '../../../context/auth-context';

/* This is an example of a 'stateless' component as it only outputs external data. It's good to use as many stateless
components as possible. Keeping a minimal amount of 'stateful' components makes the app much easier to maintain and
keeps a clear flow of data from the 'stateful' container component, down to the 'stateless' presentational component. */

class Person extends Component {
    // This is the more modern way of setting a reference on a class based component.
    constructor(props) {
        // Must always use the super function.
        super(props);
        this.inputElementRef = React.createRef();
    }

    componentDidMount() {
        // this.inputElement.focus();

        this.inputElementRef.current.focus();
    }

    render() {
        console.log('[Person.js] rendering...')

        //  Using the curly braces, we can evaluate single line expressions.
        return (
            /* React.Fragment is build into React from 16.2 onwards, removing the need for a custom Aux component where
            no single top level element is required. */
            <Fragment>
                <AuthContext.Consumer>
                    {(context) => context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p>}
                </AuthContext.Consumer>

                <p key="I1" onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!.</p>

                {/* Children is a reserved word. It outputs any elements passed in between the opening and closing tags */}
                {/* of the component usage */}
                <p key="I2" onClick={this.props.click}>{this.props.children}</p>

                {/* Without the value attribute here, you'd force the component into being 'read-only'. However, with the */}
                {/* onChange event added, you now have a two-way binding. This both allows the initial value to be a prop, but */}
                {/* also allow it to be dynamically updated too. */}
                <input key="I3"
                       // This is the older way of setting a ref
                       // ref={(inputEl) => {this.inputElement = inputEl}}
                       ref={this.inputElementRef}
                       type="text"
                       onChange={this.props.changed}
                       value={this.props.name} />
            </Fragment>
        );
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default withClass(Person, classes.Person);