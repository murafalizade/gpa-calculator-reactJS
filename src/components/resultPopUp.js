import React, { Component } from 'react';
import { Link } from "react-router-dom";

class ResultPopUp extends Component {

    render() {
        const { gpaResult, closePopUp, withGrade } = this.props;
        return (
            <div style={this.props.popUp ? { display: "block" } : { display: "none" }}>
                <div onClick={this.props.closePopUp} id="darken" className="overlay"></div>
                <div className="pop-up-save">
                    <span onClick={closePopUp}>x</span>
                    <h2>Result</h2>
                    <p >Gpa:{gpaResult}%</p>
                    <p >Gpa:{withGrade}</p>
                    <input id="valueName" placeholder="Save Name" className="form-control p-2 m-1 w-75" />
                    <Link to="/result" className="btn btn-secondary m-1 rounded btn-lg" onClick={() => { this.props.getValue(); closePopUp(); }}>Save</Link>
                </div>
            </div>
        );
    }
}

export default ResultPopUp;