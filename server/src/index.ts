import express, { application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";

dotenv.config();

const app = express();


app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



import tenantRoutes from "./routes/tenantRoutes";
import managerRoutes from "./routes/managerRoutes";
import { authMiddleware } from "./middleware/authMiddleware";
import propertyRoutes from "./routes/propertyRoutes";
import leaseRoutes from "./routes/leaseRoutes";
import applicationRoutes from "./routes/applicationRoutes";

// Routes
app.get("/", (req, res) => {
  res.send("This is home route");
});
app.use("/applications",applicationRoutes)
app.use("/properties",propertyRoutes)
app.use("/leases",leaseRoutes)
app.use("/tenants",authMiddleware(["tenant"]),tenantRoutes)
app.use("/manager",authMiddleware(["manager"]),managerRoutes)

// Server
const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT,"0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
