import React from 'react';
import useGet from './hooks/useGet';

const AppContext = React.createContext({
    articles: []
});

function AppContextProvider({ children }) {

    // Sets up the app to fetch from a REST API.
    // const { data } = useGet('/api/todos/6283b113d63de8e06abaf66f', '');

    // console.log(data?.Description);

    const dataArray = useGet('/api/todos/', '');

    //console.log(dataArray.data[0]?._id);

    // The context value that will be supplied to any descendants of this component.
    /*
    const context = {
        Description: data?.Description,
        CompletedStatus: data?.CompletedStatus,
        DueDate: data?.DueDate
    }
    */

    // Wraps the given child components in a Provider for the above context.
    return (
        <AppContext.Provider value={dataArray}>
            {children}
        </AppContext.Provider>
    );
}

export {
    AppContext,
    AppContextProvider
};