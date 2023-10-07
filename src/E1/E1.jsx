import { memo, useDeferredValue, useRef, useState } from "react";

export default function E1() {
  const [renderMe, setRenderMe] = useState("");
  // const deferedMe = useDeferredValue(renderMe);

  console.count("render E1");

  return (
    <div className="p-4">
      <div className="text-center mt-4" style={{ direction: "ltr" }}>
        <h4 className="text-xl">Performance Of Reacts...</h4>
        <h5 className="text-lg">Rendering...</h5>
      </div>

      <div className="mt-4">
        <MyInput setRenderMe={setRenderMe} />
        {renderMe}
        <List v={renderMe} />
      </div>
    </div>
  );
}

const List = memo(function List(v) {
  console.count("render list");
  return (
    <div className="mt-4">
      <h4>Huge List That Impact Performance</h4>
      <div className="flex gap-1 flex-col">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => {
          return <p key={i}>item {i}</p>;
        })}
      </div>
    </div>
  );
});

const MyInput = ({ setRenderMe }) => {
  const timerId = useRef(null);

  const delay = (e) => {
    clearTimeout(timerId.current);

    var id = setTimeout(() => {
      setRenderMe(e);
    }, 100);
    timerId.current = id;
  };

  return (
    <>
      <input onChange={(e) => delay(e.target.value)} />
    </>
  );
};
