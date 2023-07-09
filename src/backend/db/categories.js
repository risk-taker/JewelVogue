import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Necklace",
    image:'./images/necklace-c.jpg',
  },
  {
    _id: uuid(),
    categoryName: "Ring",
    image:'./images/ring-c.jpg'
  },
  {
    _id: uuid(),
    categoryName: "Bracelet",
    image:'./images/bracelet-c.jpg'
  },
  {
    _id: uuid(),
    categoryName: "Earrings",
    image:'./images/earring-c.jpg'
  },
];
