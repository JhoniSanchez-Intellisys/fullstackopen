import { Content } from "./Content";

export const Course = ({ course }) => {
  console.log("Coruses++++++", course);

  return (
    <>
      {
        <div>
          <Content courses={course} />
        </div>
      }
    </>
  );
};
