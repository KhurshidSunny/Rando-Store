// src/services/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error.message);
    return Promise.reject(error);
  }
);

// API functions

// Get all products
export async function getAllProducts() {
  const response = await api.get("/items");
  console.log(response.data);
  return response.data;
}

// Get product by ID
export async function getProductById(id) {
  const response = await api.get(`/items/${id}`);
  return response.data;
}

// Create new product
export async function createProduct(productData) {
  console.log("form data", productData);
  const response = await api.post("/items", productData);
  console.log("create function ");
  return response.data;
}

// Update product
export async function updateProduct(id, productData) {
  console.log("acutall data", productData);
  const response = await api.put(`/items/${id}`, productData);
  console.log("response", response);
  return response.data;
}

// Delete product
export async function deleteProduct(id) {
  const response = await api.delete(`/items/${id}`);
  return response.data;
}
