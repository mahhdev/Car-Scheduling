import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import swaggerUI from "swagger-ui-express";
import cors from "cors";

import { router } from "./routes";
import swaggerFile from "../../../swagger.json";

import createConnection from "@shared/infra/typeorm";

import "../../container";
import { AppError } from "@shared/errors/AppError";

createConnection();

const app = express();

app.use(cors());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
	if (err instanceof AppError) {
		return response.status(err.statusCode).json({
			message: err.message,
		});
	}

	return response.status(500).json({
		status: "error",
		message: `Internal server error - ${err.message}`,
	});
});

app.listen(3333, () => console.log("Server on!"));
