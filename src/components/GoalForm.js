import React, { useState } from 'react';


// GoalForm component
const GoalForm = ({ addGoal }) => {
  const [liftType, setLiftType] = useState(''); //sets the state to an empty string
  const [targetWeight, setTargetWeight] = useState('');
  const [targetReps, setTargetReps] = useState('');
  const [targetSets, setTargetSets] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false)

  // function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault(); //prevents the default behavior of the form which means the page will not refresh when the form is submitted 

    //mark as submitted
    setIsSubmitted(true);

    //validate entries
    const hasErrors = !liftType.match(/[a-zA-Z]/) || 
                      !targetWeight.match(/[0-9]/) || 
                      !targetReps.match(/[0-9]/) || 
                      !targetSets.match(/[0-9]/);

    if (hasErrors) {
      return; // Stop submission if validation fails
    }

    const newGoal = { //creates a new goal object with id, liftType, targetWeight, targetReps, targetSets, and an empty array of entries that will be added to the goals array
      id: Date.now(), //creates a unique id for the goal using the current date and time
      liftType,
      targetWeight,
      targetReps,
      targetSets,
      entries: []
    };
    addGoal(newGoal); //calls the addGoal function and passes the newGoal object as an argument

    setLiftType(''); //resets the state of the form fields to empty strings
    setTargetWeight(''); 
    setTargetReps('');
    setTargetSets('');
    setIsSubmitted(false); //reset the isSubmitted state
  };
 
  // form to add a new goal (with the formats of the input fields)
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Lift Type:</label>
        <input
          type="text"
          value={liftType}
          onChange={(e) => setLiftType(e.target.value)}
          required
        />
        {/* Conditional validation message for lift type */}
        {isSubmitted && !liftType && (
          <p className="error">Lift type is required and must contain at least one letter.</p>
        )}
        {isSubmitted && liftType && !liftType.match(/[a-zA-Z]/) && (
          <p className="error">Lift type must contain at least one letter.</p>
        )}
      </div>
      <div>
        <label>Target Weight (lbs):</label>
        <input
          type="text" // Change from number to text to enable regex validation
          value={targetWeight}
          onChange={(e) => setTargetWeight(e.target.value)}
          required
        />
        {/* Conditional validation message for target weight */}
        {isSubmitted && !targetWeight && (
          <p className="error">Target weight is required and must contain at least one number.</p>
        )}
        {isSubmitted && targetWeight && !targetWeight.match(/[0-9]/) && (
          <p className="error">Target weight must contain at least one number.</p>
        )}
      </div>
      <div>
        <label>Target Reps:</label>
        <input
          type="text" // Change from number to text to enable regex validation
          value={targetReps}
          onChange={(e) => setTargetReps(e.target.value)}
          required
        />
        {/* Conditional validation message for target reps */}
        {isSubmitted && !targetReps && (
          <p className="error">Target reps are required and must contain at least one number.</p>
        )}
        {isSubmitted && targetReps && !targetReps.match(/[0-9]/) && (
          <p className="error">Target reps must contain at least one number.</p>
        )}
      </div>
      <div>
        <label>Target Sets:</label>
        <input
          type="text" // Change from number to text to enable regex validation
          value={targetSets}
          onChange={(e) => setTargetSets(e.target.value)}
          required
        />
        {/* Conditional validation message for target sets */}
        {isSubmitted && !targetSets && (
          <p className="error">Target sets are required and must contain at least one number.</p>
        )}
        {isSubmitted && targetSets && !targetSets.match(/[0-9]/) && (
          <p className="error">Target sets must contain at least one number.</p>
        )}
      </div>
      <button type="submit">Add Goal</button>
    </form>
  );
};



export default GoalForm;