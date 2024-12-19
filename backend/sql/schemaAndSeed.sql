DROP TABLE IF EXISTS people;

CREATE TABLE people (
  id SERIAL PRIMARY KEY,
  name VARCHAR(25)
);

INSERT INTO people (name) VALUES ('JD');
INSERT INTO people (name) VALUES ('Chelsea');
INSERT INTO people (name) VALUES ('Richard');
INSERT INTO people (name) VALUES ('Satya');