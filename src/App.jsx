import {
  useEffect,
  useState,
  createContext,
  useContext,
  useReducer,
} from "react";

import ImageMenu from "./assets/Menu.svg";
import ImageLogo from "./assets/Logo.png";
import ImageBag from "./assets/Bag.svg";
import ImageSlider1 from "./assets/Slider1.png";
import ImageSlider2 from "./assets/Slider2.png";
import itemList from "./itemList";
import BuyerForm from "./BuyerForm";
import basketReducer, { useBasket } from "./Reducer";

export const ThemeContext = createContext({
  mode: "light", //light or dark
  fontSize: 16,
  colorSchema: "#ffffff",
});

function useIntervalHook(callback, intervalTime = 1000) {
  useEffect(() => {
    const id = setInterval(() => {
      callback();
    }, intervalTime);

    console.log("call setup effect");

    return () => {
      console.log("call clean up effect");
      clearInterval(id);
    };
  }, [callback, intervalTime]);
}

export default function App() {
  const [theme, setTheme] = useState({
    mode: "light", //light or dark
    fontSize: 16,
    colorSchema: "#ffffff",
  });

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <Home />
    </ThemeContext.Provider>
  );
}

export function Home() {
  const [basketList, setBasket] = useState([]);
  const [openBasketDialog, setBasketDialog] = useState(false);
  const [page, setPage] = useState("home");
  const [sliderImage, setSliderImage] = useState(ImageSlider1);
  const [theme, setTheme] = useContext(ThemeContext);
  const [reduceBasket, dispatch] = useReducer(basketReducer, []);
  const basketStore = useBasket((state) => state.itemList);
  const addItem = useBasket((state) => state.addItem);
  const deleteItem = useBasket((state) => state.deleteItem);
  console.log(basketStore, addItem);
  useIntervalHook(
    () =>
      setSliderImage((image) =>
        image === ImageSlider1 ? ImageSlider2 : ImageSlider1
      ),
    2222
  );
  //just for debug
  window.basketList = basketList;

  const buyItem = (item) => {
    setBasket([...basketList, item]);
  };

  const decreseItem = (item) => {
    const findItemIndex = basketList.findIndex(
      (basketItem) => basketItem === item
    );
    if (findItemIndex === -1) return alert("cant remove");
    basketList.splice(findItemIndex, 1);

    setBasket([...basketList]);
  };

  const buyCount = basketList.length;

  const getBasketGroupList = () => {
    const list = [];

    basketList.forEach((item) => {
      const finded = list.find((i) => i.item === item);
      if (finded) {
        finded.count++;
      } else {
        list.push({ count: 1, item });
      }
    });

    return list;
  };

  if (page === "home")
    return (
      <div
        id="home"
        className={`bg-[#f1f1f1]  ${theme.mode == "light" ? "" : "dark"}`}
      >
        {/* toolbar */}
        <div className="flex p-3 px-6 items-center dark:bg-black">
          <img src={ImageMenu} />
          <img src={ImageLogo} />
          فراوین
          <button
            onClick={() => {
              setTheme({
                ...theme,
                mode: theme.mode == "light" ? "dark" : "light",
              });
            }}
          >
            {theme.mode == "light" ? "dark" : "light"}
          </button>
          <button
            onClick={() => {
              dispatch({
                type: "addItem",
                item: {
                  name: "item1",
                },
              });

              addItem({ name: "item1" });
            }}
          >
            dispatch
          </button>
          <button
            onClick={() => {
              dispatch({
                type: "delete",
                item: {
                  name: "item1",
                },
              });

              deleteItem({ name: "item1" });
            }}
          >
            dispatch delete
          </button>
          <div className="flex-1" />
          <div className="relative" onClick={() => setBasketDialog(true)}>
            <img src={ImageBag} className="w-6 h-6 ml-1" />
            {buyCount !== 0 && (
              <span className="absolute bg-red-500 text-white rounded-full w-6 h-6 text-center top-[50%] left-[50%]">
                {(buyCount > 99 ? "+۹۹" : buyCount).toLocaleString("fa-ir")}
              </span>
            )}
          </div>
          <span onClick={() => setBasketDialog(true)}>سبد خرید</span>
        </div>

        {/* divider */}
        <div className="h-[1px] bg-slate-300 mx-4" />

        {/* for animation add div */}
        <div className="relative mt-2 m-auto w-full h-48">
          <img
            src={ImageSlider1}
            className={
              "absolute m-auto w-full p-4 transition-opacity" +
              (sliderImage === ImageSlider2 ? " opacity-0" : "")
            }
            style={{ transitionDuration: "1500ms" }}
          />
          <img
            src={ImageSlider2}
            className={
              "m-auto w-full p-4  absolute transition-opacity" +
              (sliderImage === ImageSlider1 ? " opacity-0" : "")
            }
            style={{ transitionDuration: "1500ms" }}
          />
        </div>

        <div className="flex p-6 gap-4 flex-wrap">
          {itemList.map((item) => {
            const itemButCount = basketList.filter(
              (buyItem) => buyItem === item
            ).length;
            return (
              <div
                key={item.name}
                className="flex-1 rounded-lg border-[1px] border-[#C9CBD1] overflow-hidden min-w-[200px]"
              >
                <div className="h-28">
                  <img
                    src={item.image || ImageSlider2}
                    className="h-full m-auto"
                  />
                </div>
                <div className="flex flex-col h-48 bg-white rounded-t-2xl p-2">
                  <h4 className="text-sm font-semibold">
                    {item.name}
                    <span className="text-xs"> (موجودی:‌ {item.mojodi})</span>
                  </h4>
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

                  {itemButCount === 0 && (
                    <button
                      disabled={item.mojodi === 0}
                      onClick={() => buyItem(item)}
                      className="mt-2 rounded-md bg-[#30303A] text-white text-sm p-1 disabled:bg-slate-200"
                    >
                      خرید کالا
                    </button>
                  )}

                  {itemButCount !== 0 && (
                    <div className="flex gap-1 items-center">
                      <button
                        className="w-4 rounded-3xl bg-red-500"
                        onClick={() => {
                          decreseItem(item);
                        }}
                      >
                        -
                      </button>
                      <button
                        disabled={item.mojodi === 0}
                        className="flex-1 mt-2 rounded-md bg-[#30303A] text-white text-sm p-1 disabled:bg-slate-200"
                      >
                        تعداد:
                        {itemButCount}
                        عدد
                      </button>

                      <button
                        className="w-4 rounded-3xl bg-green-500"
                        onClick={() => {
                          if (itemButCount >= item.mojodi)
                            return alert("cant buy");

                          setBasket([...basketList, item]);
                        }}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* basket dialog */}
        {openBasketDialog && (
          <div
            onClick={() => setBasketDialog(false)}
            className="fixed w-full h-full top-0 p-6 bg-[#00000088] backdrop-blur-sm"
          >
            <div
              onClick={(event) => event.stopPropagation()}
              className="flex flex-col p-4 gap-4 bg-white rounded-xl"
            >
              {getBasketGroupList().map((orderItem) => {
                const { item, count } = orderItem;
                return (
                  <div key={item.name} className="flex gap-4 items-center">
                    <img src={item.image} className="w-16" />
                    <div className="text-sm">
                      {item.name}

                      <span className="mr-10">
                        تعداد خرید:
                        {(+count).toLocaleString("fa-ir")}
                      </span>

                      <span className="mr-10">
                        {" "}
                        {(+item.salePrice).toLocaleString("fa-ir")} تومان
                      </span>

                      <p className="mt-1">{item.description}</p>
                    </div>
                  </div>
                );
              })}

              <p>
                قیمت کل قابل پرداخت:{" "}
                {getBasketGroupList()
                  .reduce((price, orderItem) => {
                    return orderItem.count * orderItem.item.salePrice + price;
                  }, 0)
                  .toLocaleString("fa-ir")}{" "}
                تومان
                <button
                  onClick={() => {
                    setPage("buyerForm");
                    setBasketDialog(false);
                  }}
                  className="bg-green-500 rounded-sm p-2 mr-4"
                >
                  پرداخت سفارش{" "}
                </button>
              </p>

              <button
                onClick={() => setBasketDialog(false)}
                className="bg-slate-200 rounded-sm p-2"
              >
                ‌بستن سفارشات
              </button>
            </div>
          </div>
        )}
      </div>
    );

  if (page === "buyerForm") return <BuyerForm setPage={setPage} />;
}
