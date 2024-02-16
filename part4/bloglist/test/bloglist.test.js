const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const helper = require("./test_helper.js");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/modelblog.js");
const api = supertest(app);

// const initialBlog = [
//   {
//     title: "Casa",
//     author: "Jhoni",
//     url: "http...../////////",
//     likes: 200,
//   },
//   {
//     title: "Casa",
//     author: "Jhoni",
//     url: "http...../////////",
//     likes: 200,
//   }
// ];

test("Los blogs han retornado como JSON", async () => {
  await api
    .get("/api/blog")
    .expect(200)
    .expect("Content-Type", /application\/json/); // expresion regular
  // .expect('Content-Type', 'application/json') //no se recomienda pero puede funcionar
});

test("all notes are returned", async () => {
  const response = await api.get("/api/blog");
  assert(response.body.length, helper.initialBlogs.length);
});

test("there are 2 blogs", async () => {
  const response = await api.get("/api/blog");
  //   assert.strictEqual(response.body.length, 2);
  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("the first note is about HTTP methods", async () => {
  const response = await api.get("/api/blog");
  const contents = response.body.map((e) => e.author);
  //   assert.strictEqual(contents.includes("Jhoni"), true);
  assert(contents.includes("Jhoni"));
});

test("a valid note can be added ", async () => {
  const newBlog = {
    title: "async/await simplifies making async calls",
    author: "Jhoni",
    url: "http...../////////",
    likes: 200,
  };

  await api
    .post("/api/blog")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await helper.blogInDB();
  // const response = await api.get("/api/blog");
  // expect(response).toHaveLength(helper.initialBlogs.length + 1)

  const contents = response.map((r) => r.title);
  assert.strictEqual(contents.length, helper.initialBlogs.length + 1);
  //   expect(contents).toContain('async/await simplifies making async calls' ) no se usa, aun no se ha usado Jest
  //   assert(contents.includes("async/await simplifies making async calls"));
});

test("note without content is not added", async () => {
  const newBlog = {
    author: "Jhoni",
    url: "http...../////////",
    likes: 200,
  };
  await api.post("/api/blog").send(newBlog).expect(400);
  const notesAtEnd = await helper.blogInDB();

  assert.strictEqual(notesAtEnd.length, helper.initialBlogs.length);
  //   expect(notesAtEnd).toHaveLength(helper.initialBlogs.length)    no funciona, porque aun no se usa Jest

  //   const response = await api.get("/api/blog");
});

test("a specific note can be viewed", async () => {
  const notesAtStart = await helper.blogInDB();
  const noteToView = notesAtStart[0];
  const resultNote = await api
    .get(`/api/blog/${noteToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);console.log(noteToView)
  assert.deepStrictEqual(resultNote.body[0], noteToView);
});

test("a note can be deleted", async () => {
  const notesAtStart = await helper.blogInDB();
  const noteToDelete = notesAtStart[0];
  await api.delete(`/api/blog/${noteToDelete.id}`).expect(204);
  const notesAtEnd = await helper.notesInDb();
  const contents = notesAtEnd.map((r) => r.content);
  assert(!contents.includes(noteToDelete.content));
  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1);
});

//rev ese cod. si es necesario
beforeEach(async () => {
  await Blog.deleteMany({});
  let noteObject = new Blog(helper.initialBlogs[0]);
  await noteObject.save();
  noteObject = new Blog(helper.initialBlogs[1]);
  await noteObject.save();
});

after(async () => {
  await mongoose.connection.close();
});
