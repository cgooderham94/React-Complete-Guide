import React, { Component } from 'react';

import Aux from '../../../hoc/Aux';

// import './Person.css';
import styled from 'styled-components'

const StyledDiv = styled.div`
    width: 60%;
    padding: 1rem;
    margin: 1rem auto;
    border: 2px solid #CCC;
    background-color: #EEE;
    box-shadow: 2px 4px 4px #DDD;
    text-align: center;
    transition: 0.2s ease-in-out;
    
    @media (min-width: 576px) {
        width: 450px;
    }
`;

/* This is an example of a 'stateless' component as it only outputs external data. It's good to use as many stateless
components as possible. Keeping a minimal amount of 'stateful' components makes the app much easier to maintain and
keeps a clear flow of data from the 'stateful' container component, down to the 'stateless' presentational component. */

class Person extends Component {
    render() {
        console.log('[Person.js] rendering...')

        //  Using the curly braces, we can evaluate single line expressions.
        return (
            <React.Fragment>
                <p key="I1" onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!.</p>,

                {/* Children is a reserved word. It outputs any elements passed in between the opening and closing tags */}
                {/* of the component usage */}
                <p key="I2" onClick={this.props.click}>{this.props.children}</p>,

                {/* Without the value attribute here, you'd force the component into being 'read-only'. However, with the */}
                {/* onChange event added, you now have a two-way binding. This both allows the initial value to be a prop, but */}
                {/* also allow it to be dynamically updated too. */}
                <input key="I3" type="text" onChange={this.props.changed} value={this.props.name} />
            </React.Fragment>
        );
    }
}

export default Person;