import React, { useState } from 'react';

// ProgressForm component displays the form where users can enter progress entries
const ProgressForm = ({ goalId, addEntry, setCurrentGoalId }) => {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [datetime, setDatetime] = useState(new Date().toISOString().slice(0, 10)); //sets the default date to today but removes the time and timezone and also allows the user to change the date

  //function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault(); //stops page from refreshing when form is submitted
    const newEntry = {
      id: Date.now(),
      weight,
      reps,
      sets,
      datetime: new Date(datetime).toLocaleDateString()
    };
    addEntry(goalId, newEntry); //call addEntry and passes the goalId and newEntry object as arguments
    setCurrentGoalId(null); //sets the currentGoalId back to null to stop adding progress
  };

  //form to add a new entry (with the formats of the input fields)
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Weight (lbs):</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Reps:</label>
        <input
          type="number"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Sets:</label>
        <input
          type="number"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default ProgressForm;