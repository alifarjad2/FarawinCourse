import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ImageMenu from "./assets/Menu.svg";
import ImageLogo from "./assets/Logo.png";
import ImageBag from "./assets/Bag.svg";
import ImageSlider1 from "./assets/Slider1.png";
import ImageSlider2 from "./assets/Slider2.png";
import ImageItem1 from "./assets/item1.png";
import ImageItem2 from "./assets/item2.png";

const itemList = [
  {
    name: "بالاباز/ ورزشی زنانه",
    description: "گرمکن ورزشی زنانه بالاباز مدل ۸۰۲۰۱۰۰۵۹۰۵-۵۹",
    price: "630000",
    salePrice: "360000",
    image: ImageItem1,
  },

  {
    name: "بالاباز/ ورزشی ",
    description: "گرمکن ورزشی زنانه بالاباز مدل ۸۰۲۰۱۰۰۵۹۰6-۵۹",
    price: "420000",
    salePrice: "240000",
    image: ImageItem1,
  },

  {
    name: "سیدونا/ کفش پسرانه",
    description: "کفش راحتی چراغدار سیدونا مدل KSI۰۹۰۲۶-۰۰۳",
    price: "550000",
    salePrice: "110000",
    image: ImageItem2,
  },
  {
    name: "سیدونا/ کفش دخترانه",
    description: "کفش راحتی چراغدار سیدونا مدل KSI۰۹sd۰۲۶-۰۰۳",
    price: "350000",
    salePrice: "150000",
    // image: ImageItem2,
  },
];

ReactDOM.createRoot(document.getElementById("root")).render(
  // for dev purpuse
  // just render twice
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function App() {
  const [buyCount, setBuyCount] = useState(0);
  return (
    <div className="bg-[#f1f1f1]">
      {/* toolbar */}
      <div className="flex p-3 px-6 items-center ">
        <img src={ImageMenu} />
        <img src={ImageLogo} />
        فراوین
        <div className="flex-1" />
        <div className="relative">
          <img src={ImageBag} className="w-6 h-6 ml-1" />
          {buyCount !== 0 && (
            <span className="absolute bg-red-500 text-white rounded-full w-6 h-6 text-center top-[50%] left-[50%]">
              {(buyCount > 99 ? "+۹۹" : buyCount).toLocaleString("fa-ir")}
            </span>
          )}
        </div>
        سبد خرید
      </div>

      {/* divider */}
      <div className="h-[1px] bg-slate-300 mx-4" />

      <img
        src={Math.random() > 0.5 ? ImageSlider2 : ImageSlider1}
        className="mt-2 m-auto w-full p-4"
      />

      <div className="flex p-6 gap-4 flex-wrap">
        {itemList.map((item) => (
          <div
            key={item.name}
            className="flex-1 rounded-lg border-[1px] border-[#C9CBD1] overflow-hidden min-w-[200px]"
          >
            <div className="h-28">
              <img src={item.image || ImageSlider2} className="h-full m-auto" />
            </div>
            <div className="flex flex-col h-48 bg-white rounded-t-2xl p-2">
              <h4 className="text-sm font-semibold"> {item.name} </h4>
              <p className="text-xs font-light mt-2 leading-6">
                {item.description}
              </p>

              {/* for spacing */}
              <div className="flex-1" />
              <p className="text-xs font-light line-through text-left text-slate-300">
                {(+item.price).toLocaleString("fa-ir")} تومان
              </p>
              <h4 className="text-sm font-semibold text-left">
                {(+item.salePrice).toLocaleString("fa-ir")} تومان
              </h4>

              <button
                onClick={() => setBuyCount((c) => c + 1)}
                className="mt-2 rounded-md bg-[#30303A] text-white text-sm p-1"
              >
                خرید کالا
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
