import React, { useState, useEffect } from 'react';
import './App.css';
import GoalForm from './components/GoalForm'; //import form where users enter goals
import GoalList from './components/GoalList'; //import list of goals
import ProgressForm from './components/ProgressForm'; //import form where users enter progress/ log entries


//Local storage functions
const myStoredGoals = () => { //function to get goals from local storage if theres any 
  const storedGoals = localStorage.getItem('goals');
  return storedGoals ? JSON.parse(storedGoals) : [];
};

const storingMyGoals = (goals) => { //function to save goals to local storage 
  localStorage.setItem('goals', JSON.stringify(goals));
};


//App component
function App() {
  const [goals, setGoals] = useState(myStoredGoals()); //display any goals in local storage (or empty array if none)
  const [currentGoalId, setCurrentGoalId] = useState(null); //used to keep track of which goal the user is currently adding progress to

 
  useEffect(() => {  //useEffect to store goals whenever the goals state changes (ex: adding, editing, deleting goals)
    storingMyGoals(goals);
  }, [goals]);



  //Add, edit, and delete goals
  const addGoal = (goal) => { //add goal to be displayed in the list of goals
    setGoals([...goals, goal]);
  };

  const editGoal = (updatedGoal) => { //edit goal by updating the goal object with the new values
    setGoals(goals.map(goal => goal.id === updatedGoal.id ? updatedGoal : goal));
  };

  const deleteGoal = (id) => { //delete goal by filtering out the goal with the matching id
    setGoals(goals.filter(goal => goal.id !== id));
  };

//Add, edit, and delete entries
  const addEntry = (goalId, entry) => { //add an entry to a goal
    setGoals(goals.map(goal => goal.id === goalId ? {
        ...goal,
        entries: [...goal.entries, entry]
    } : goal));
  };

  const editEntry = (goalId, updatedEntry) => { //edit an entry by updating the entry object with the new values
    setGoals(goals.map(goal => goal.id === goalId ? {
      ...goal,
      entries: goal.entries.map(entry => entry.id === updatedEntry.id ? updatedEntry : entry)
    } : goal));
  };

  const deleteEntry = (goalId, entryId) => { //delete an entry by filtering out the entry with the matching id
    setGoals(goals.map(goal => goal.id === goalId ? {
      ...goal,
      entries: goal.entries.filter(entry => entry.id !== entryId)
    } : goal));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Lifting Tracker</h1>
        <GoalForm addGoal={addGoal} />
        <GoalList
          goals={goals}
          editGoal={editGoal}
          deleteGoal={deleteGoal}
          addEntry={addEntry}
          editEntry={editEntry}
          deleteEntry={deleteEntry}
          setCurrentGoalId={setCurrentGoalId}
        />
        {currentGoalId && (
          <ProgressForm
            goalId={currentGoalId}
            addEntry={addEntry}
            setCurrentGoalId={setCurrentGoalId}
          />
        )}
      </header>
    </div>
  );
}

export default App;