import axios from 'axios'

export const Products = async () => await axios.get("/api/products");