const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/photoapp');

const personSchema = new mongoose.Schema({
    name: String,
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Person = mongoose.model('Person', personSchema);

async function addName(name) {
    try {
      const newPerson = await new Person(name);
      await newPerson.save();
      return newPerson;
    } catch (err) {
      console.log('Something went wrong:', err);
    }
}

async function getNames() {
    const people = await Person.find({});
    return people;
}

async function deleteName(id) {
  const objectId = new mongoose.Types.ObjectId(id);
  await Person.deleteOne({ _id: objectId });
  return { message: `${id} was deleted.` };
}

module.exports = {
    addName,
    getNames,
    deleteName
}