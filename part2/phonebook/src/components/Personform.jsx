import React from 'react'

export default function Personform({addperson,
    newNumber,
    setNewNumber, setNewName, newName}) {
  return (
    <form onSubmit={addperson}>
    <div>
      Name:
      <input value={newName} onChange={(e) => setNewName(e.target.value)} />
    </div>
    <div>
      Numbers:
      <input
        value={newNumber}
        onChange={(e) => setNewNumber(e.target.value)}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}
