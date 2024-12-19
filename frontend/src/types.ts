import { ObjectId } from "mongodb";

export type Person = {
  id: number | string;
  name: string;
}

export type NewPerson = Omit<Person, 'id'>;