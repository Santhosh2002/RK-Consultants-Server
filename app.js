const express = require("express");
const app = express();
const connectDatabase = require("./config/database.connection");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerDocs = require("./middleware/swagger.middleware");

const clientRoutes = require("./routes/client.routes");
const servicesRoutes = require("./routes/services.routes");
const projectRoutes = require("./routes/project.routes");
const userRoutes = require("./routes/user.routes");
const statsRoutes = require("./routes/stats.routes");
const visitorRoutes = require("./routes/visitor.routes");
const generalRoutes = require("./routes/general.routes");
const listingRoutes = require("./routes/listing.routes");
const mailRoutes = require("./routes/mail.routes");
const bodyParser = require("body-parser");

dotenv.config();
const port = process.env.PORT || 3000;
app.use(
  cors({
    //allow all origin
    origin: "*",
    //allow all headers
    allowedHeaders: "*",
    //allow all methods
    methods: "*",
  })
);
app.use(cors());
app.use(express.json()); // ✅ This should be enabled
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); // ✅ Ensures JSON parsing

connectDatabase(process.env.DATABASE_URL, process.env.DATABASE_NAME);

app.use("/api/user", userRoutes);
app.use("/api/service", servicesRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/visitor", visitorRoutes);
app.use("/api/general", generalRoutes);
app.use("/api/listing", listingRoutes);
app.use("/api/mail", mailRoutes);

swaggerDocs(app);

app.listen(port, () => console.log(`App listening on port ${port}!`));
