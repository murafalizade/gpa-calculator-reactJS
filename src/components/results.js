import React, { Component } from 'react';

class ResultPage extends Component {

  deleted(id) {
    this.props.deletedItems(id)
  }

  clear() {
    this.props.clearAllList();
  }
  render() {
    return (
      <div style={{ "zIndex": "-1" }}>
        <table className="table mt-4 table-dark table-hover" style={{ "maxHeight": "350px", "overflow": "auto" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Gpa(percent)</th>
              <th>Gpa(grade)</th>
              <th></th>
            </tr>
          </thead>
          <tbody >
            {
              this.props.dataList.map(i => (
                <tr className="text-center" key={i.id}>
                  <td >{i.name}</td>
                  <td >{i.gpa1}%</td>
                  <td>{i.gpa2}</td>
                  <td><button className="btn btn-danger  btn-small"
                    onClick={this.deleted.bind(this, i.id)}>X</button></td>
                </tr>))
            }
          </tbody>
        </table>
        <button onClick={this.clear.bind(this)} className="btn btn-danger btn-block">Clear All</button>
      </div>
    );
  }
}

export default ResultPage;