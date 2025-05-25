import { useState, useEffect } from 'react';
import './MeasurementCalculator.css';

const MeasurementCalculator = () => {
  const [input, setInput] = useState({ width: '', height: '' });
  const [rows, setRows] = useState(() => {
    const savedRows = localStorage.getItem('measurementRows');
    return savedRows ? JSON.parse(savedRows) : [];
  });

  useEffect(() => {
    localStorage.setItem('measurementRows', JSON.stringify(rows));
  }, [rows]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const width = parseFloat(input.width);
    const height = parseFloat(input.height);
    if (isNaN(width) || isNaN(height)) return;
    const col3 = (width - 8) / 3;
    const col4 = col3 + 0.625;
    const col5 = height - 1.5;
    const col6 = col5 - 2.5;
    setRows([
      ...rows,
      {
        col1: width,
        col2: height,
        col3,
        col4,
        col5,
        col6,
      },
    ]);
    setInput({ width: '', height: '' });
  };

  const handleDelete = (index) => {
    setRows(rows.filter((_, idx) => idx !== index));
  };

  return (
    <div className="calculator-container">
      <h1>Measurement Calculator</h1>
      <form className="input-section" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="width">Width:</label>
          <input
            type="number"
            id="width"
            name="width"
            value={input.width}
            onChange={handleChange}
            placeholder="Enter width"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="height">Height:</label>
          <input
            type="number"
            id="height"
            name="height"
            value={input.height}
            onChange={handleChange}
            placeholder="Enter height"
            required
          />
        </div>
        <button type="submit" className="submit-btn">Add Row</button>
      </form>
      {rows.length > 0 && (
        <div className="results-section">
          <h2>Sheet</h2>
          <table className="results-table">
            <thead>
              <tr>
                <th>Width</th>
                <th>Height</th>
                <th>BE</th>
                <th>Col 4</th>
                <th>Col 5</th>
                <th>Col 6</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.col1.toFixed(2)}</td>
                  <td>{row.col2.toFixed(2)}</td>
                  <td>{row.col3.toFixed(2)}</td>
                  <td>{row.col4.toFixed(2)}</td>
                  <td>{row.col5.toFixed(2)}</td>
                  <td>{row.col6.toFixed(2)}</td>
                  <td>
                    <button onClick={() => handleDelete(idx)} className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MeasurementCalculator; 