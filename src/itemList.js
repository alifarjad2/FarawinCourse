import ImageItem1 from "./assets/item1.png";
import ImageItem2 from "./assets/item2.png";
import ImageItem3 from "./assets/image 10.png";
import ImageItem4 from "./assets/image 11.png";
import ImageItem5 from "./assets/image 12.png";
import ImageItem6 from "./assets/image 14.png";
import ImageItem7 from "./assets/image 15.png";
import ImageItem8 from "./assets/image 22.png";
import ImageItem9 from "./assets/image 23.png";
import ImageItem10 from "./assets/image 24.png";
import ImageItem11 from "./assets/image 25.png";
import ImageItem12 from "./assets/image 26.png";

const itemImageList = [
  ImageItem1,
  ImageItem2,
  ImageItem3,
  ImageItem4,
  ImageItem5,
  ImageItem6,
  ImageItem7,
  ImageItem8,
  ImageItem9,
  ImageItem10,
  ImageItem11,
  ImageItem12,
];

const itemList = Array(Math.round(Math.random() * 333))
  .fill(null)
  .map((row, index) => {
    const price = Math.round(Math.random() * 1000000) + 100000;
    return {
      id: index,
      name: "کالای شماره" + index + 1,
      description: "توضیحات کالای مدل" + " " + Math.random(),
      price: price,
      salePrice: Math.round(price / 3),
      mojodi: Math.round(Math.random() * 100),
      image: itemImageList[Math.round(Math.random() * itemImageList.length)],
    };
  });

export default itemList;
