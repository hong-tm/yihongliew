import { z } from "zod";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const EnvSchema = z.object({
	ALLOWED_ORIGINS: z
		.string()
		.default("http://localhost:3000,http://localhost:5173"),
});

export type env = z.infer<typeof EnvSchema>;

// validate
const envPath = path.resolve(process.cwd(), ".env");
let envFileKeys: string[] = [];

try {
	if (fs.existsSync(envPath)) {
		const envFileLines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
		envFileKeys = envFileLines
			.map((line) => line.trim())
			.filter((line) => line && !line.startsWith("#"))
			.map((line) => line.split("=")[0].trim())
			.filter((key) => key.length > 0); // <-- add this filter!
	}
} catch (error) {
	console.error("❌ Error reading .env file:", error);
	process.exit(1);
}

const schemaKeys = Object.keys(EnvSchema.shape);
const extraKeys = envFileKeys.filter((key) => !schemaKeys.includes(key));

const red = (str: string) => `\x1b[31m${str}\x1b[0m`;

if (extraKeys.length > 0) {
	console.warn(
		`⚠️ The following variables are present in .env but NOT in your schema: ${extraKeys
			.map(red)
			.join(", ")}`
	);
}

// Parse
const { data: env, error } = EnvSchema.safeParse(process.env);

if (error) {
	console.error("🔴 Invalid environment variables:");
	const prettyError = z.prettifyError(error);
	console.error(prettyError);
	process.exit(1);
} else {
	console.log("🟢 Environment variables loaded successfully!");
}

export default env!;
