import IAppConfig from "./IAppConfig";

export default interface IConfigManager {
    config: IAppConfig | null;
}