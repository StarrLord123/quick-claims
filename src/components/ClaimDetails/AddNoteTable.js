import React, { useState } from "react";
import './AddNoteTable.css'

function Infotablerows({ rows, tableRowRemove, onValUpdate }) {

    return rows.map((rowsData, index) => {
        const { completed, date, note } = rowsData;
        return (
            <tr
                className="addNoteTable"
                key={index}
            >
                <td>
                    <select id="completed" value={completed} onChange={(event) => onValUpdate(index, event)}>
                        <option value="" disabled={false}> ---select---</option>
                        <option value="New Claim">Not Completed</option>
                        <option value="New Claim">Completed</option>
                    </select>
                </td>
                  <td>
                    <input
                      type="date"
                      value={date}
                      onChange={(event) => onValUpdate(index, event)}
                      id="date"
                    />
                </td>
                <td>
                    <input
                      type="text"
                      value={note}
                      onChange={(event) => onValUpdate(index, event)}
                      id="note"
                    />
                </td>
                <td>
                    <button
                      className="button text-center"
                      onClick={() => tableRowRemove(index)}
                    >
                      X
                    </button>
                </td>
            </tr>
        );
    });
}

function AddNoteTable() {
    const [rows, initRow] = useState([]);
    const addRowTable = () => {
        let time = new Date().toISOString().slice(0, 10);
        const data = {
          completed: "",
          date: time,
          note: "",
        };
        initRow([...rows, data]);
    };
    const tableRowRemove = (index) => {
        const dataRow = [...rows];
        dataRow.splice(index, 1);
        initRow(dataRow);
    };
    const onValUpdate = (i, event) => {
        const { value } = event.target;
        const data = [...rows];
        data[i] = value;
        initRow(data);
    };
    return (
        <>

            <table className="addNoteTable">
              <thead>
                <tr>
                  <th>Completed</th>
                  <th>Date</th>
                  <th>Note</th>
                  <th>
                    <button
                      className="button text-center"
                      onClick={addRowTable}
                    >
                      Add
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                <Infotablerows
                  rows={rows}
                  tableRowRemove={tableRowRemove}
                  onValUpdate={onValUpdate}
                />
              </tbody>
            </table>
        </>
    );
}
export default AddNoteTable;