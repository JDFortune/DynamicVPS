import { useState, useEffect, SyntheticEvent } from 'react';
import { addPerson, getPeople, deletePerson } from './services/namesService';
import { Person } from './types';

function App() {
  const [pPeople, setPPeople] = useState<Person[]>([]);
  const [pName, setPName] = useState('');

  useEffect(() => {
    getPeople().then(people => setPPeople(people));
  }, []);

  const submitPostgresForm = (e: SyntheticEvent) => {
    e.preventDefault();
    const person = { name: pName };

    addPerson(person)
      .then((response) => setPPeople([...pPeople, response]));
  }

  const createDelete = (id: number) => {
    return (e: SyntheticEvent) => {
      e.preventDefault();

      deletePerson({id})
        .then(() => {
          console.log('Successfully Deleted');
          setPPeople((current) => current.filter(person => person.id !== id));
      });
    }
  }
  
  return (
    <>
      <fieldset className="postgres">
      <h2>Add new postgres name</h2>
      <form onSubmit={submitPostgresForm}>
        New P-Name: <input
          value={pName}
          onChange={(e) => setPName(e.target.value)}
        /><br/>
        <input type='submit' value="Add Postgres Person"/>
      </form>
      <br/>
      <ol>
        {pPeople.map((person) => {
          return (
            <>
              <li key={person.id}>{person.name} <button onClick={createDelete(person.id)}>delete</button></li>
            </>
          )
        })}
      </ol>
      </fieldset>

      {/* <fieldset className="mongo">
        <h2>Add new mongo name</h2>
        <form onSubmit={submitMongoForm}>
          New M-Name: <input
            value={name: mName}
            onChange={(e) => setMName(e.target.value)}
          /><br/>
          <input type='submit' value="Add Mongo Person"/>
        </form>
        <br/>
        <ol>
          {mPeople.map((person) => {
            return (
              <>
                <li key={person.id}>{person.name} <button onClick={createDelete(person.id)}>delete</button></li>
              </>
            )
          })}
        </ol>
      </fieldset> */}
    </>
  )
}

export default App
