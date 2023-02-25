/**
 *  Code Goblin - A discord bot for programmers.

 Copyright (C) 2022, ThatGuyJamal and contributors
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 GNU Affero General Public License for more details.
 */

import { main } from "Main";
import mongoose from "mongoose";

export class MongodbDatabase {
	/** Access core methods for the database */
	public schemas;

	public constructor() {
		this.schemas = {
			config: {}
		};

        this.init();
	}

	/** Connects to the mongodb host */
	public async init(): Promise<void> {
		await mongoose
			.connect(main.appConfig.mongodb_uri)
			.then(() => {
				console.log("Connected to Mongodb!");
			})
			.catch((err) => {
				console.log(`Error connecting to the database: ${err}`);
			});
	}

	/**
	 * Checks if the database is connected
	 * @returns { NetworkStatusReturnTypes } The status of the database
	 */
	public network_status(): NetworkStatusReturnTypes {
		return {
			connected: mongoose.connection.readyState === 1,
			status: mongoose.connection.readyState,
		};
	}
}

type NetworkStatusReturnTypes = {
	connected: boolean;
	status: number;
};
