export function Part({ courses }) {
  console.log("COURSES....", courses);

  return (
    <div>
      {courses.map((el) => (
        <p key={el.id}>
          {el.name} {el.exercises}
        </p>
      ))}
    </div>
  );
}
