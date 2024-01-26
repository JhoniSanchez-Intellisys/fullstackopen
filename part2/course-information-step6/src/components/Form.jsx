// import { useState } from "react";

// export const Form = ({notes, setcourse}) => {
// console.log('notas', notes);

//   const [newNote, setNewNote] = useState(
//     'a new note...'
//   ) 
//   const addNote = (event) => {
//     event.preventDefault()

//     const noteObject = {
//       name: newNote, 
//       exercises: Math.random() < 0.5,
//       id: notes.length + 1
//     }
    
//     setcourse(notes.concat(noteObject))

    
// // const nueva = ()=>(notes.concat(noteObject) );
// // console.log('nueva nota', nueva()  ) 


//     setNewNote('')
//     console.log('button clicked', event.target)
//   }


//   const handleNoteChange = (event) => {
//     console.log(event.target.value)
//     setNewNote(event.target.value)
//   }

//   return (
//     <form onSubmit={addNote}>
//       <input 
//       value={newNote} 
//       onChange={handleNoteChange}
//       />
//       <button type="submit">save</button>
//     </form>
//   );
// };
