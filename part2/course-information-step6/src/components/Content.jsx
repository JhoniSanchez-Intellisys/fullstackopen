import { Header } from "./Header";
import { Part } from "./Part";
import { Total } from "./Total";

export function Content({courses}) {
  console.log("Content.....>", courses);
  
  return (
    <div>
      {courses.map((el) => (
        <div key={el.id}>
          <Header header = {el.name}/>
          <Part courses={el.parts} />
          <Total total={el.parts} />
        </div>
      ))}
    </div>
  );
}
