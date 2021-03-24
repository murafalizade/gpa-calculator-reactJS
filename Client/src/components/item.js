import React, { Component } from 'react';
import uuid from "uuidv4";


class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newItem: [

                {
                    id: 0,
                    jsx: <div key={0} className="ml-4">
                        <input type="text"
                            className="course-name"
                            placeholder="Course Name" />
                        <input
                            placeholder="Grade"
                            type="number"
                            className="browser"
                            min="0"
                        />
                        <input type="number"
                            className="course-credits"
                            placeholder="Credits"
                            min="0"
                        />
                        <button type="button"
                            onClick={this.deleteComponent.bind(this, 0)}
                            className="closed-button btn-danger">X</button>
                    </div>
                }

            ]
        }
    }

    addComponent = () => {
        let rows = this.state.newItem;
        const unique = uuid()
        if (rows.length < 15) {
            rows.push(
                {
                    id: unique,
                    jsx: 
                    <div key={unique} className="ml-4">
                         <input type="text"
                             className="course-name"
                             placeholder="Course Name" />
                         <input
                             placeholder="Grade"
                             type="number"
                             className="browser"
                             min="0"
                         />
                         <input type="number"
                           className="course-credits"
                             placeholder="Credits"
                             min="0"
                         />
                         <button type="button"
                             onClick={this.deleteComponent.bind(this, unique)}
                             className="closed-button btn-danger">X</button>
                     </div>
                }
            );
            this.setState({ newItem: rows });
        }
        else {
            alert("You can add only 15 course. If you want to add more , you save this and creat new result. Then you again summary these. Sorry :( ");
        }
    }

    deleteComponent(numValue) {
        let item = this.state.newItem;
        let update = item.filter(num => num.id !== numValue);
        this.setState({ newItem: update });
    }
    render() {
        return (
            <div className="content-item">
                <form className="ml-4" style={{ "maxHeight": "350px", "overflow": "auto" }}>
                    {
                        this.state.newItem.map(item => (
                            item.jsx
                        ))
                    }
                </form>
                <button style={{ "position": "relative", "left": "20%" }}
                    className="ml-4 btn btn-info rounded"
                    onClick={this.addComponent}
                    type="button">Add new course</button>
            </div>
        );
    }
}

export default Item;