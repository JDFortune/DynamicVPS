import axios from 'axios';
import { NewPerson } from '../types';


const baseUrl = 'https://jd-onlyfans.com/mongo/';

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

export function deletePerson(id: {id: String}) {
  return axios.post(baseUrl + 'remove', id);
}

export default {
    getPeople,
    addPerson,
    deletePerson,
}

/*
photoapp:
people : [{id: number, name: string}, {id: number, name: string} ]

*/