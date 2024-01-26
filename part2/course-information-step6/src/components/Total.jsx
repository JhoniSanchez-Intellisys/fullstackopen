export function Total({ total }) {
  console.log("Total---->", total);

  const Arraytotal = total.map((el) => el.exercises);
  console.log("Arreglo de totales", Arraytotal);
  const Sum = Arraytotal.reduce((acc, curr) => acc + curr);


  return (
    <div>
      <h4>Total: {Sum} excersise</h4>
    </div>
  );
}
