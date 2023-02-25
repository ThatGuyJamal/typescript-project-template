import { MongodbDatabase } from "database/mongodb/mongo";
import { AppConfig, configValues, IAppConfig } from "./config";
import { Utils } from "./lib/utils";

/**
 * The entry point of the application.
 */
export class Main {
	/** The configuration information for the app */
	public readonly appConfig: IAppConfig;
	/** Common utilities for the app */
	public readonly utils: Utils;
	public databases
	public constructor() {
		this.appConfig = new AppConfig(configValues).data;
		this.utils = new Utils(this);
		this.databases = {
			mongodb: new MongodbDatabase()
		}
	}
}

export const main = new Main();
