require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");

const Note = require("./Schema.js");
app.use(express.static("dist"));
app.use(express.json());
// app.use(requestLogger)

app.use(cors());
// mongoose.set('strictQuery', false)

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(morgan(":url :method :body"));

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
response.send(error.message)
  // next(error);

  // if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  // }
};

// this has to be the last loaded middleware.

// mongoose.connect(url)
// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,
// })

// noteSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })

// const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//   content: "HTML is Easy",
//   important: true,
// });

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

// Note.find({ important: true }).then(result => {
//   // ...
// })

// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   // mongoose.connection.close()
// })

// let persons = [
// {
//   id: 1,
//   name: "Arto Hellas",
//   number: "040-123456",
// },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/info", (request, response) => {
  Note.find({})
    .then((notes) => {
      const data = new Date();
      const entries = notes.length;
      // response.json(notes)
      response.send(`<p>Phonebook has info for ${entries} people</p>
                       <p> ${data}</p>`);
      console.log(notes);
    })
    .catch((error) => {
      console.log(error);
      response.status(500).end();
    });
});

// app.get("/api/persons", (request, response) => {
//   Note.find({}).then((result) => {
//     result.forEach((note) => {
//       console.log(note);
//            response.json(note);

//     });
//     // mongoose.connection.close();
//   });

// });

app.get("/api/persons", (request, response) => {
  Note.find({})
    .then((notes) => {
      response.json(notes);
      console.log(notes);
    })
    .catch((error) => {
      console.log(error);
      response.status(500).end();
    });
});

// app.get("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id);

//   const person = persons.filter((el) => {
//     return el.id == id;
//   });

//   if (person.length == 0) {
//     response.status(404).end();
//   }
//   if (person) {
//     response.json(person);
//   } else {
//     response.status(404).end();
//   }
// });

app.get("/api/persons/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch(
      (error) => next(error)

      // error => {
      // console.log(error)
      // response.status(400).send({ error: 'malformatted id' })}
    );
});

// app.delete("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id);
//   const person = persons.filter((el) => {
//     return el.id !== id;
//   });

//   persons = person;
//   console.log(person);
//   response.status(200).json(person);
// });

app.delete("/api/persons/:id", (request, response, next) => {

  Note.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

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
  
  const note = {
    name: body.name,
    number: body.number,
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true, runValidators: true, context: 'query'  })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;
 
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

  // const nameExist = persons.find((el) => {
  //   return el.name == body.name;
  // });

  // if (nameExist) {
  //   return response.status(400).json({
  //     error: "this name exist",
  //   });
  // }
  // const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  // noteSchema
  const note = new Note({
    // id: maxId + 1,
    name: request.body.name,
    number: request.body.number,
  });

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })
    .catch((error) => next(error));

  // .catch(error => {
  //   console.log(error)
  //   response.status(500).end()
  // });

  // mongoose.connection.close();

  // const note = request.body;
  // note.id = maxId + 1;

  // persons = persons.concat(note);

  // response.json(note);
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});