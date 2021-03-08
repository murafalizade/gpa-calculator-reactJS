import React from "react";
import "./App.css"
import Navbar from "./components/navbar"
import Item from "./components/item";
import ResultPopUp from "./components/resultPopUp";
import { v4 as uuid } from "uuid";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Guide from "./components/guide";
import ResultPage from "./components/results";

export default class App extends React.Component {

  state = {
    popUp: false,
    result: 0,
    gpaResult: 0,
    listResult: []
  }

  clearList = (id) => {
    let list = this.state.listResult;
    let ipgradelist = list.filter(i => i.id !== id);
    this.setState({ listResult: ipgradelist });
  }

  clearAllList = () => {
    this.setState({ listResult: [] });
  }

  closePopUp = () => {
    if (this.state.popUp === true) {
      this.setState({ popUp: false });
    }
    else {
      this.setState({ popUp: true });
    }
  }

  getResult() {
    const name = document.getElementById("valueName").value;
    let list = this.state.listResult;
    if (name.length !== 0) {
      const keyValue = uuid.v4();
      let gpa = this.state.result;
      let gpaGrade = this.state.gpaResult;

      const data = {
        "id": keyValue,
        "name": name,
        "gpa1": gpa,
        "gpa2": gpaGrade
      };
      list.push(data);
      this.setState({ listResult: list });
    }
    else {
      alert("You must write a name for save. If you willn't write anything to input , you don't save your results. Please write save name .");
    }
    document.getElementById("valueName").value = "";
  }



  gpaNumCalc = () => {
    let array1 = document.getElementsByClassName("browser");
    let array2 = document.getElementsByClassName("course-credits");
    let totalPoint = 0; let total, totalcredits = 0;
    for (let j = 0; j < array1.length; j++) {
      if (array2[j].value !== "" && array1[j].value !== "") {
        let grade = parseInt(array1[j].value);
        let credits = parseInt(array2[j].value);
        if (grade >= 90) {
          grade = 4
        }
        else if (grade >= 80) {
          grade = 3;
        }
        else if (grade >= 70) {
          grade = 2;
        }
        else if (grade >= 60) {
          grade = 1;
        }
        else {
          grade = 0;
        }
        totalPoint += grade * credits;
        totalcredits += credits;
      }
      if (totalcredits === 0) {
        totalcredits = 1;
      }
      total = (totalPoint / totalcredits).toFixed(2);
      this.setState({ gpaResult: total });
    }
  }

  gpaCalculator = () => {
    let array1 = document.getElementsByClassName("browser");
    let array2 = document.getElementsByClassName("course-credits");
    let totalPoint = 0; let total, totalcredits = 0;
    for (let i = 0; i < array1.length; i++) {
      if (array2[i].value !== "" && array1[i].value !== "") {
        totalPoint += array1[i].value * array2[i].value;
        totalcredits += parseInt(array2[i].value);
      }
    }
    if (totalcredits === 0) {
      totalcredits = 1;
    }
    total = (totalPoint / totalcredits).toFixed(2);
    this.setState({ result: total });
  }

  componentDidUpdate() {
    const simpleData = JSON.stringify(this.state.listResult);
    localStorage.setItem("name", simpleData);
  }

  componentDidMount() {
    let newData = localStorage.getItem("name");
    newData = JSON.parse(newData);
    if (newData === null) {
      newData = [];
    }
    this.setState({ listResult: newData });
  }

  render() {
    return (
      <React.Fragment>
        <div className="barier"></div>
        <Router>
          <div className="container">
            <Navbar />
            <Switch>
              <Route exact path="/">
                <div className="main">
                  <div className="main-content">\
                    <Item
                      popUp={this.state.popUp}
                      gpaCalculator={this.gpaCalculator}
                    />
                  </div>
                  <button
                    className=" btn btn-primary rounded"
                    onClick={() => {
                      this.setState({ popUp: true });
                      this.gpaCalculator();
                      this.gpaNumCalc();
                    }}
                    id="result">Calculate</button>
                </div>
              </Route>
              <Route path="/guide">
                <Guide />
              </Route>
              <Route path="/result">
                <ResultPage name={this.state.name}
                  dataList={this.state.listResult}
                  gpaResult={this.state.result}
                  deletedItems={this.clearList}
                  clearAllList={this.clearAllList} />
              </Route>
            </Switch>
            <ResultPopUp
              closePopUp={this.closePopUp}
              withGrade={this.state.gpaResult}
              gpaResult={this.state.result}
              getValue={this.getResult.bind(this)}
              popUp={this.state.popUp}
            />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}
