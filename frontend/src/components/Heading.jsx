export function Heading(props) {
  return (
    <>
      <div className="font-bold text-4xl pt-6">{props.head}</div>
      <div className="text-slate-500 text-md pt-1 px-4 pb-4">{props.subHead}</div>
    </>
  );
}

export default Heading;
