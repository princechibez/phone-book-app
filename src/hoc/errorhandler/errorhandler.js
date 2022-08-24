import React, { Component } from "react";

import Modal from "../../UI/modal/modal";
import { Aux } from "../auxi/auxi";


const errorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error.response});
            });
        }

        componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        
        errorConfirmedHandler = () => {
            this.setState({error: false})
        }

        render() {
            return (
                <Aux>
                    { this.state.error ? <Modal
                    clicked={this.errorConfirmedHandler}
                    show={this.state.error}>
                        {this.state.error ? this.state.error.statusText : null}
                    </Modal> : null }
                    <WrappedComponent {...this.props}  />
                </Aux>
            );
        }
    }
}

export default errorHandler;