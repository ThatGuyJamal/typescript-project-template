import { createLogger, format as wFormat, transports, Logger } from "winston";
import { format } from "logform";
import type { Main } from "../../Main";

export class ILogger {
	private winston: Logger;
	private readonly enabled: boolean;
	private main: Main;

	public constructor(m: Main) {
		this.main = m;
		if (this.main.appConfig.logFiles) this.enabled = true;
		else this.enabled = false;

		this.winston = createLogger({
			level: "info",
			format: wFormat.json(),
			defaultMeta: { service: "bot" },
			transports: [
				new transports.File({
					filename: "./logs/info.log",
					level: "info",
				}),
				new transports.File({
					filename: "./logs/error.log",
					level: "error",
				}),
				new transports.File({
					filename: "./logs/debug.log",
					level: "debug",
				}),
				new transports.File({
					filename: "./logs/warn.log",
					level: "warn",
				}),
			],
		});

		if (this.enabled) {
			this.winston.add(
				new transports.Console({
					format: format.simple(),
				})
			);
		}

		this.winston.format = format.combine(
			format.colorize(),
			format.timestamp(),
			format.align(),
			format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
		);

		this.winston.exceptions.handle(
			new transports.File({ filename: "./logs/exceptions.log" })
		);
	}

	/**
	 * Log a message at the 'info' level
	 * @param message
	 * @param args
	 */
	public info(message: string, ...args: any[]) {
		if (this.enabled) this.winston.info(message, ...args);
	}

	/**
	 * Log a message at the 'error' level
	 * @param message
	 * @param args
	 * @returns
	 */
	public error(message: any, ...args: any[]) {
		if (this.enabled) this.winston.error(message, ...args);
	}

	/**
	 * Log a message at the 'error' level
	 * @param message
	 * @param args
	 * @returns
	 */
	public warn(message: string, ...args: any[]) {
		if (this.enabled) this.winston.warn(message, ...args);
	}

	/**
	 * Log a message at the 'debug' level
	 * @param message
	 * @param args
	 * @returns
	 */
	public debug(message: string, ...args: any[]) {
		if (this.enabled) this.winston.debug(message, ...args);
	}

	/**
	 * Log a message at the 'crit' level
	 * @param message
	 * @param args
	 * @returns
	 */
	public crit(message: string, ...args: any[]) {
		if (this.enabled) this.winston.crit(message, ...args);
	}

	/**
	 * Log a message at the 'notice' level
	 * @param message
	 * @param args
	 * @returns
	 */
	public notice(message: string, ...args: any[]) {
		if (this.enabled) this.winston.notice(message, ...args);
	}
}
