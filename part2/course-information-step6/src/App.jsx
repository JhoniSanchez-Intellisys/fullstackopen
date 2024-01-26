import { useState } from "react";
import { Course } from "./components/Course";
// import { Form } from "./components/Form";

const App = ({courses}) => {
  const [course, setcourse] = useState(courses)
console.log('Notas', course[0].parts);

  return (
    <div>
      <h1>Web Development Curriculum</h1>
      <Course course={course} />
      {/* <Form notes={course[0].parts} setcourse={setcourse}/> */}
    </div>
  );
};

export default App;
