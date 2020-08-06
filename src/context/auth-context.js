// This context component gets used only in component where it is needed saving the need for chaining props.
import React from 'react';

const authContext = React.createContext({
    authenticated: false,
    login: () => {}
});

export default authContext;