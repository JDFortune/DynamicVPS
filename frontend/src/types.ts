export type Person = {
  id: number;
  name: string;
}

export type NewPerson = Omit<Person, 'id'>;