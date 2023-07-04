/** @format */

import axios from 'axios'

const BASE_URL = 'https://lecreatelier-89d29f40b586.herokuapp.com/api/'

export const publicRequest = axios.create({
  baseURL: BASE_URL
})
