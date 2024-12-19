import axios from 'axios';
import { NewPerson } from '../types';


const baseUrl = 'http://localhost:3000/postgres/';

export function getPeople() {
  return axios.get(baseUrl)
    .then((response) => response.data);
}

export function addPerson(person: NewPerson) {
  return axios.post(baseUrl + 'new', person)
    .then(response => {
      return response.data;
  });
}

export function deletePerson(id: {id: number}) {
  return axios.post(baseUrl + 'remove', id);
}

export default {
  getPeople,
  addPerson,
  deletePerson,
}