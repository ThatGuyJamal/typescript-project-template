import { config } from "dotenv";

config();

// The state of the development environment
// false = production
const dev = true;

export const configValues = {
	inDevelopmentMode: dev,
	logFiles: true,
	fixme: dev ? process.env.fixme! : process.env.fixme!,
	admin_ids: new Set(["370637638820036608"]),
	mongodb_uri: "mongodb://localhost:27017/test",
};

export type IAppConfig = typeof configValues;

export class AppConfig {
	public constructor(config: IAppConfig) {
		this.validateObject(config);
	}

	public get data(): IAppConfig {
		return configValues;
	}

	/**
	 * Validates the properties of the config object.
	 * @param obj
	 */
	private validateObject(obj: Object) {
		for (const [key, value] of Object.entries(obj)) {
			if (value === undefined || value === null) {
				throw new Error(
					`The environment variable ${key} is not set in the .env file.`
				);
			}
		}
	}
}
