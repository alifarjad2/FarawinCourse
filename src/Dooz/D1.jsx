import { memo, useDeferredValue, useState } from "react";

export default function D1() {
  const array = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const [turn, setTurn] = useState("X");

  const handelClick = (row, column) => {
    if (board[row][column]) return;

    // board[row][column] = turn;
    // setBoard([...board]);
    setBoard([...board, (board[row][column] = turn)]);
    setTurn(turn === "O" ? "X" : "O");
  };

  // checkWiner();
  return (
    <>
      <p> turn : {turn}</p>
      <div className="p-4" style={{ direction: "ltr" }}>
        <div className=" w-32 h-10 px-4 py-2.5 bg-slate-500 rounded-full justify-center items-center inline-flex">
          <div className="LabelText text-center text-white text-sm font-medium font-['Estedad'] leading-tight">
            عنوان دکمه
          </div>
        </div>

        <div
          className="ModeLightStyleFilledStateHovered"
          style={{
            width: 134,
            height: 40,
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 10,
            paddingBottom: 10,
            background: "#6750A4",
            boxShadow: "0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
            borderRadius: 100,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
            display: "inline-flex",
          }}
        >
          <div
            className="StateLayer"
            style={{
              width: 134,
              height: 40,
              opacity: 0.08,
              background: "white",
              borderRadius: 100,
            }}
          />
          <div
            className="LabelText"
            style={{
              paddingLeft: 8,
              paddingRight: 8,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <div
              className="LabelText"
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 14,
                fontFamily: "Estedad",
                fontWeight: "500",
                lineHeight: 20,
                wordWrap: "break-word",
              }}
            >
              عنوان دکمه
            </div>
          </div>
          <div
            className="LeadingIcon"
            style={{ width: 18, height: 18, position: "relative" }}
          >
            <div
              className="Icon"
              style={{
                width: 12,
                height: 12,
                left: 3,
                top: 3,
                position: "absolute",
                background: "white",
              }}
            ></div>
          </div>
        </div>

        <div className="ModeLightStyleFilledStateDisabled w-32 h-10 px-4 py-2.5 rounded-full justify-center items-center inline-flex">
          <div className="LabelText px-2 justify-center items-center flex">
            <div className="LabelText opacity-40 text-center text-zinc-900 text-sm font-medium font-['Estedad'] leading-tight">
              عنوان دکمه
            </div>
          </div>
        </div>

        <div className="">
          {array.map((row, index) => {
            return (
              <div key={index} className="flex">
                {row.map((number, column) => {
                  return (
                    <span
                      style={{
                        cursor: board[index][column]
                          ? "not-allowed"
                          : "pointer",
                      }}
                      key={column}
                      className="flex justify-center  text-[40px] items-center w-[100px] h-[100px] border border-2 text-center"
                      onClick={() => handelClick(index, column)}
                    >
                      {board[index][column]}
                    </span>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
