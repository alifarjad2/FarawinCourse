import React, {
  memo,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from "react";

export default function E2() {
  const [renderMe, setRenderMe] = useState("");
  const [debouncedRenderMe, setDebouncedRenderMe] = useState("first");
  console.count("render E2", debouncedRenderMe);
  console.log("log E2", debouncedRenderMe);

  return (
    <div className="p-4">
      <div className="text-center mt-4" style={{ direction: "ltr" }}>
        <h4 className="text-xl">Performance Of Reacts...</h4>
        <h5 className="text-lg">Rendering...</h5>
      </div>

      <div className="mt-4">
        <input
          value={renderMe}
          onChange={(e) => {
            setDebouncedRenderMe(e.target.value);
            setRenderMe(e.target.value);
          }}
          placeholder="for rendering..."
        />
        <DebouncedInput
          state={[debouncedRenderMe, setDebouncedRenderMe]}
          placeholder="for rendering..."
        />
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
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => {
          return <p key={i}>item {i}</p>;
        })}
      </div>
    </div>
  );
});

const DebouncedInput = ({ state, debounce = 100, ...props }) => {
  const [debouncedRenderMe, setDebouncedRenderMe] = state;
  const [renderMe, setRenderMe] = useState(debouncedRenderMe);

  const timeoutRef = useRef();

  const handleChange = (e) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(
      () => setDebouncedRenderMe(e.target.value),
      debounce
    );
    setRenderMe(e.target.value);
  };

  //for direct change state
  useEffect(() => {
    setRenderMe(debouncedRenderMe);
  }, [debouncedRenderMe]);

  return (
    <input
      value={renderMe}
      onChange={handleChange}
      placeholder="for debounce rendering..."
      {...props}
    />
  );
};
