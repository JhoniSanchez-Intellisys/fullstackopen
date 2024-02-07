const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001
app.use(express.json());

app.use(cors());

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(morgan(":url :method :body"));

// app.use(morgan(':method :url :status :response-time ms - :req[content-type]'));
// app.use('/api/persons', morgan(':req :res'));
// app.use(morgan(':req'));

// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }
// app.use(requestLogger)

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/info", (request, response) => {
  const data = new Date();
  const entries = persons.length;

  response.send(`<p>Phonebook has info for ${entries} people</p>
  <p> ${data}</p>`);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
  //   response.end(notes)
  // response.end(JSON.stringify(notes))
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);

  const person = persons.filter((el) => {
    return el.id == id;
  });

  if (person.length == 0) {
    response.status(404).end();
  }
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  // const persond = persons.find((el)=>{
  //   return el.id === id;
  // })
  // const indice = persons.indexOf(persond)

  const person = persons.filter((el) => {
    return el.id !== id;
  });

  persons = person;
  console.log(person);
  response.status(200).json(person);
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  // console.log(body)
  if (!body.name) {
    return response.status(400).json({
      error: "Name missing",
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  }
  const nameExist = persons.find((el) => {
    return el.name == body.name;
  });

  if (nameExist) {
    return response.status(400).json({
      error: "this name exist",
    });
  }
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;

  const note = request.body;
  note.id = maxId + 1;

  persons = persons.concat(note);

  response.json(note);
});

// app.get('/api/notes/:id', (request, response) => {
//     const id = request.params.id
//     const note = notes.find(note => note.id == id)
//     response.json(note)
//   })

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }

// app.use(unknownEndpoint)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)

})
