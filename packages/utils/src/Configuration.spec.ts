import "reflect-metadata";
import { Configuration } from "./Configuration";
import ConfigurationModel from "./ConfigurationModel";

describe("Testing Configuration", () => {
  it("Should return if the configuration is in DB", async () => {
    ConfigurationModel.findOne = jest.fn().mockResolvedValue({
      configuration_key: "abc",
      configuration_value: "xyz",
    });
    let configurationResult = await Configuration.getByKey("TEST");

    expect(ConfigurationModel.findOne).toHaveBeenCalledWith({
      where: {
        configuration_key: "TEST",
      },
    });
    expect(configurationResult.configuration_key).toBe("abc");
    expect(configurationResult.configuration_value).toBe("xyz");
  });
});
