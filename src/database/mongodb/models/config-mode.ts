import {
	getModelForClass,
	ModelOptions,
	prop,
	ReturnModelType,
} from "@typegoose/typegoose";

@ModelOptions({
	schemaOptions: {
		collection: "configurations",
		timestamps: true,
		autoIndex: true,
	},
})
class AppConfig {
	@prop({ type: String, default: "en-US" })
	language?: string;

	/**
	 * Gets a stored application configuration in the database.
	 * @param id An Id for this configuration document.
	 * @returns
	 */
	public static async GetConfig(
		this: ReturnModelType<typeof AppConfig>,
		id: string
	): Promise<AppConfig | null> {
		const config = await this.findOne({ _id: id });
		if (!config) return null;
		return config;
	}

	/**
	 * Creates a new application configuration in the database.
	 * @param id An Id for this configuration document.
	 * @returns
	 */
	public static async CreateConfig(
		this: ReturnModelType<typeof AppConfig>,
		id: string
	) {
		return await this.create({ _id: id });
	}
}

export const AppConfigModel = getModelForClass(AppConfig);
