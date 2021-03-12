import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useLocation } from "react-router-dom";

const ResultPage = (props) => {
  const [results, setResults] = useState([]);
  const url = useLocation();
  function deleted(id) {
    props.deletedItems(id)
  }

  function clear() {
    props.clearAllList();
  }

  useEffect(() => {
    let token = url.pathname.slice(8);
    console.log(token);
    axios.get(`http://localhost:8080/api/users/${token}`).then(res => setResults(res.data))
      .catch(err => console.log(err));
  }, [url])
  return (
    <div style={{ "zIndex": "-1" }}>
      {props.load === true ? (
        <><table className="table mt-4 table-dark table-hover" style={{ "maxHeight": "350px", "overflow": "auto" }}>
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
              results.map(i => (
                <tr className="text-center" key={i.id}>
                  <td >{i.name}</td>
                  <td >{i.gpa1}%</td>
                  <td>{i.gpa2}</td>
                  <td><button className="btn btn-danger  btn-small"
                    onClick={() => deleted(i.id)}>X</button></td>
                </tr>))
            }
          </tbody>
        </table>
          <button onClick={() => clear()} className="btn btn-danger btn-block">Clear All</button></>)
        : <h2>
          Please wait dowlanding your data . . .
        </h2>
      }
    </div>
  );
}

export default ResultPage;