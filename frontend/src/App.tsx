import { useState, useEffect, SyntheticEvent } from 'react';
import postgresService from './services/postgresService';
import mongoService from './services/mongoService';
import { Person } from './types';

function App() {
  const [postgresPeople, setPostgresPeople] = useState<Person[]>([]);
  const [postgresName, setPostgresName] = useState('');
  const [mongoPeople, setMongoPeople] = useState<Person[]>([]);
  const [mongoName, setMongoName] = useState('');


  useEffect(() => {
    postgresService.getPeople().then(people => setPostgresPeople(people));
    mongoService.getPeople().then(people => setMongoPeople(people));
  }, []);

  const postgresSubmitHandler = (e: SyntheticEvent) => {
      e.preventDefault();

      const person = { name: postgresName };
  
      postgresService.addPerson(person)
        .then((response: any) => {
          setPostgresPeople([...postgresPeople, response]);
          setPostgresName('');
      });
    }

  const mongoSubmitHandler = (e: SyntheticEvent) => {
    e.preventDefault();

    const person = { name: mongoName };

    mongoService.addPerson(person)
      .then((response: any) => {
        setMongoPeople([...mongoPeople, response]);
        setMongoName('');
    });
  }

    const createPostgresDelete = (id: string | number) => {
      return (e: SyntheticEvent) => {
        e.preventDefault();
        if (typeof id === 'string') return;
  
        postgresService.deletePerson({id})
          .then(() => {
            console.log('Successfully Deleted');
            setPostgresPeople((current) => current.filter(person => person.id !== id));
        });
      }
    }

    const createMongoDelete = (id: string | number) => {
      return (e: SyntheticEvent) => {
        e.preventDefault();
        if (typeof id === 'number') return null;
  
        mongoService.deletePerson({id})
          .then(() => {
            console.log('Successfully Deleted');
            setMongoPeople((current: Person[]) => current.filter(person => person.id !== id));
        });
      }
    }
  
  return (
    <>
      <fieldset className="postgres">
      <h2>Add new postgres name</h2>
      <form onSubmit={postgresSubmitHandler}>
        New P-Name: <input
          value={postgresName}
          onChange={(e) => setPostgresName(e.target.value)}
        /><br/>
        <input type='submit' value="Add Postgres Person"/>
      </form>
      <br/>
      <ol>
        {postgresPeople.map((person) => {
          return (
            <li key={`${person.id}_${person.name}`}>{person.name} <button onClick={createPostgresDelete(person.id)}>delete</button></li>
          )
        })}
      </ol>
      </fieldset>

      <fieldset className="mongo">
        <h2>Add new mongo name</h2>
        <form onSubmit={mongoSubmitHandler}>
          New M-Name: <input
            value={mongoName}
            onChange={(e) => setMongoName(e.target.value)}
          /><br/>
          <input type='submit' value="Add Mongo Person"/>
        </form>
        <br/>
        <ol>
          {mongoPeople.map((person) => {
            return (
                <li key={person.id}>{person.name} <button onClick={createMongoDelete(person.id)}>delete</button></li>
            );
          })}
        </ol>
      </fieldset>
    </>
  )
}

export default App
