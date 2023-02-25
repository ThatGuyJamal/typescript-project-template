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
	public constructor() {
		this.appConfig = new AppConfig(configValues).data;
		this.utils = new Utils(this);
	}
}

export const main = new Main();
