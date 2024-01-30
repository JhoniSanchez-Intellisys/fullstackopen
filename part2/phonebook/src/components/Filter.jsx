import React from 'react'

export default function Filter({searching, search }) {
  return (
    <div>
    Filter Show with:
    <input value={search} onChange={(e)=>searching(e)} />

  </div>
  )
}
