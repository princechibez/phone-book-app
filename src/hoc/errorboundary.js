import React, { Component } from "react";

class errorBoundary extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null
        }

    }

    componentDidCatch (err, info) {
        this.setState({error: err});
    }

    render() {
        return (
            this.state.error ? 
            <div style={{textAlign: "center"}}>Something went wrong!!</div> : 
            this.props.children
        );
    }

}

export default errorBoundary;