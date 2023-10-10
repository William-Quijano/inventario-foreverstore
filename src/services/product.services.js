import {http_client} from "@/plugins/http_client";

const url = '/api/v1/product'
const getProducts= async (params = {}) => await http_client(url, params, 'get')


export default {
  getProducts,

}
