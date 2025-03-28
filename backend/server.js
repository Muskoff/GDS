const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const db = require("./db");
const { placeOrder,getGasTypes,getAvailableRiders, getAvailableVehicles } = require("./controllers/placeordercontroller"); // Import controller
const { loginUser } = require("./controllers/authcontroller"); // Import auth controller
const { signupUser } = require("./controllers/signupuser"); // Import signup controller
const { updateGasPrice } = require("./controllers/gascontroller"); // Import gas controller
const {processPayment } = require("./controllers/paymentcontroller");
const { getOrdersForRider, markOrderAsCompleted } = require("./controllers/vieworderscontrller"); // Import view orders controller
const { getAllEarnings } = require("./controllers/earningcontroller"); // Import earning controller
const { adminLogin,adminSignup } = require("./controllers/admincontroller"); // Import admin controller
const { getGasLevels, updateGasLevels, initializeGasData } = require("./controllers/managegasescontroller"); // Import manage gases controller
const { getGasDetails } = require("./controllers/getgasdetailscontroller"); // Import gas details controller
const { getUsers, updateUser, deleteUser } = require("./controllers/adminusercontroller"); // Import admin user controller
const {setUserAvailability, getUserAvailability} = require("./controllers/availabiltycontroller"); // Import driver availability controller
const { createPaymentIntent } = require("./controllers/paymentscontroller"); // Import payments controller

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

// Routes
app.post("/api/orders", placeOrder); // Order placement route
app.get("/api/get-gas", getGasTypes); // Gas types route
app.post("/signup", signupUser); // Signup route
app.post("/login", loginUser); // Login route
app.post("/api/gas", updateGasPrice); // Gas controller route
app.post("/api/payment", processPayment); // Payment route
app.get("/api/vieworders", getOrdersForRider); // View orders route
app.put("/api/orderscomplete/:order_id", markOrderAsCompleted);
app.get("/api/earnings", getAllEarnings); // Earnings route
app.post("/admin/login", adminLogin); // Admin login route
app.post("/admin/signup", adminSignup); // Admin signup route
app.post("/api/initialize", initializeGasData);
app.get("/api/gaslevels", getGasLevels);
app.put("/api/gaslevel", updateGasLevels);
app.get("/api/gasdetails", getGasDetails); // Gas details route
app.get("/api/users", getUsers); // Get all users route
app.put("/api/users/:id", updateUser); // Update user route
app.delete("/api/users/:id", deleteUser); // Delete user route
app.get("/api/riders", getAvailableRiders); // Get available riders route
app.get("/api/vehicles", getAvailableVehicles); // Get available vehicles route
app.post("/api/availables", setUserAvailability); // Toggle user availability
app.get("/api/available/:user_id", getUserAvailability); // Get user availability
app.post("/api/payment-intent", createPaymentIntent); // Create payment intent






const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 