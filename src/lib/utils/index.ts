import type { Main } from "../../Main";
import { ILogger } from "./logger";

export class Utils {
  private readonly main: Main;
  public logger: ILogger
  public constructor(mainInstance: Main) {
    this.main = mainInstance;
    this.logger = new ILogger(this.main);
  }

  public get getMainInstance(): Main {
    return this.main;
  }
}
