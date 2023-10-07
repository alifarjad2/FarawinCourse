import {
  memo,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export default function E3() {
  console.count("render E3");
  return (
    <div className="p-4">
      <div className="text-center mt-4" style={{ direction: "ltr" }}>
        <h4 className="text-xl">Performance Of Reacts...</h4>
        <h5 className="text-lg">Rendering...</h5>
      </div>

      <div className="mt-4">
        {/* <List /> */}
        {list}
      </div>
    </div>
  );
}

const List = memo(function List(v) {
  console.log("render list");
  const [fastRender, setFastRender] = useState(0);

  useEffect(() => {
    setInterval(() => setFastRender((c) => c + 1), 100);
  }, []);

  const array = [];
  array.length = parseInt(Math.random() * 1000);
  array.fill(Math.random() * 1000);
  return (
    <div className="mt-4">
      <h4>Huge List That Impact Performance ({fastRender}) </h4>
      <div className="flex gap-1 flex-col">
        {array.map((i, ii) => {
          return (
            <div key={ii}>
              {/* large painting (rendering ) */}
              <input className="shadow-orange-400 w-20 bg-slate-400" />
              <p>item {i}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
});
