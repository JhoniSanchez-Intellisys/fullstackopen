function Header(props) {
  return <div>{props.course}</div>;
}

function Part(props) {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
}

function Content(props) {
  return (
    <div>
      <Part part={props.p1} exercises={props.e1} />
      <Part part={props.p2} exercises={props.e2} />
      <Part part={props.p3} exercises={props.e3} />
    </div>
  );
}

function Footer(props) {
  return <p>Number of exercises {props.e1 + props.e2 + props.e3}</p>;
}

///////////////////////





const App = () => {
  const course = "Half Stack application development";
  // const part1 = "Fundamentals of React";
  // const exercises1 = 10;
  // const part2 = "Using props to pass data";
  // const exercises2 = 7;
  // const part3 = "State of a component";
  // const exercises3 = 14;

  // const part1 = {
  //   name: 'Fundamentals of React',
  //   exercises: 10
  // }
  // const part2 = {
  //   name: 'Using props to pass data',
  //   exercises: 7
  // }
  // const part3 = {
  //   name: 'State of a component',
  //   exercises: 14
  // }

  const part1 = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content
        p1={part1[0].name}
        e1={part1[0].exercises}
        p2={part1[1].name}
        e2={part1[1].exercises}
        p3={part1[2].name}
        e3={part1[2].exercises}
      />
      <Footer e1={part1[0].exercises} e2={part1[1].exercises} e3={part1[2].exercises} />
    </div>
  );
};

export default App;
