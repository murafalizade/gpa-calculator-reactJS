import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Guide extends Component {
    render() {
        return (
            <div style={{ "zIndex": "-1" }}>
                <h2 className="text-secondary">
                    How to Calculate Gpa point ?
                </h2>
                <p>
                    SAT, ACT, GRE, LSAT, GPA... high school and college studies are filled with acronyms and it's enough to make anyone’s mind spin. GPA stands for grade point average and it’s yet another metric you’ll need to keep track of in high school, college, and beyond. Students often get confused on all things
                </p>
                <p className="math"> <span style={{ position: "relative", top: "-10px" }}> Gpa = </span> <span className="frac"><sup>Grade × credit</sup><span>/</span><sub>credit</sub></span></p>
                <Link to="/" style={{ position: 'relative', left: "50px" }} className="btn btn-primary rounded btn-large  m-5 text-center">Let's Calculate</Link>
            </div>
        );
    }
}

export default Guide;