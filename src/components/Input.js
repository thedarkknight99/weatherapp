import React from 'react'
import './input.css'

function Input(props) {
    return (
        <div className="container">
            <div>{props.error ? error():null}</div>
            <form onSubmit={props.submitEvent}>
                <div className="row">
                    <div className="col-md-3 py-1">
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-3 py-1">
                        <input
                            type="text"
                            name="country"
                            placeholder="Country"
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-3  mt-md-0 ">
                        <button className="btn btn-success">Search</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

const error = props => {
    return (
      <div className="alert alert-danger mx-5" role="alert">
        Please Enter City and Country...!
      </div>
    );
}

export default Input
