import React from 'react';

const StyleLoader = React.createClass({
    render(){
        return(
            <link rel="stylesheet" type="text/css" href={this.props.stylesheetPath} />
        )
    }
});

const StyleLoaderM = () => <StyleLoader stylesheetPath='https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/css/materialize.min.css' />

export { StyleLoader , StyleLoaderM}