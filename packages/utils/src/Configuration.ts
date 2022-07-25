import ConfigurationModel from "./ConfigurationModel";

export const Configuration = {
  async getByKey(configuration_key: string): Promise<ConfigurationModel> {
    return await ConfigurationModel.findOne({ where: { configuration_key } });
  },
};
