import React, { useState } from 'react';

// EntryList component displays the list of entries for a goal and the different actions that can be performed
const EntryList = ({ goalId, entries, editEntry, deleteEntry }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [editWeight, setEditWeight] = useState('');
  const [editReps, setEditReps] = useState('');
  const [editSets, setEditSets] = useState('');
  const [editDatetime, setEditDatetime] = useState('');

  //function to handle editing an entry by updating the entry object with the new values
  const handleEditEntry = (entry) => {
    const updatedEntry = {
      ...entry,
      weight: editWeight,
      reps: editReps,
      sets: editSets,
      datetime: new Date(editDatetime).toLocaleDateString()
    };
    editEntry(goalId, updatedEntry); //calls editEntry and passes the goalId and updatedEntry object as arguments
    setIsEditing(null); //sets isEditing back to null to stop editing
  };

  //how the entry list will be displayed
  return (
    <div className="entry-list">
      {entries.map(entry => (
        <div key={entry.id} className="entry-item">
          {isEditing === entry.id ? (
            <div>
              <input
                type="number"
                value={editWeight}
                placeholder="Weight"
                onChange={(e) => setEditWeight(e.target.value)}
              />
              <input
                type="number"
                value={editReps}
                placeholder="Reps"
                onChange={(e) => setEditReps(e.target.value)}
              />
              <input
                type="number"
                value={editSets}
                placeholder="Sets"
                onChange={(e) => setEditSets(e.target.value)}
              />
              <input
                type="date"
                value={editDatetime}
                onChange={(e) => setEditDatetime(e.target.value)}
              />
              <button onClick={() => handleEditEntry(entry)}>Save</button>
            </div>
          ) : (
            <div>
              <p>{entry.weight} lbs - {entry.reps} reps - {entry.sets} sets - {entry.datetime}</p>
              <div>
                <button onClick={() => {
                  setIsEditing(entry.id);
                  setEditWeight(entry.weight);
                  setEditReps(entry.reps);
                  setEditSets(entry.sets);
                  setEditDatetime(new Date(entry.datetime).toISOString().slice(0, 10));
                }}>Edit</button>
                <button onClick={() => deleteEntry(goalId, entry.id)}>Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EntryList;