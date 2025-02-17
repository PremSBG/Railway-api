const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/auth", require("./routes/authRoutes"));
app.use("/train", require("./routes/trainRoutes"));
app.use("/booking", require("./routes/bookingRoutes")); // ✅ Ensure this is correct

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));