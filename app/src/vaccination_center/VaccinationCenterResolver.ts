import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { UserModel } from "../auth/UserModel";
import { validateUser } from "../middlewares/validateUser";
import { Context } from "../contexts/Context";
import { VaccinationCenterModel } from "./VaccinationCenterModel";
import { AppointmentModel } from "../appointments/AppointmentModel";

@InputType()
class VaccinationCenterInput {
  @Field()
  name: string;
  @Field()
  location: string;
}

@Resolver()
export class VaccinationCenterResolver {
  @Query(() => [VaccinationCenterModel])
  @UseMiddleware(validateUser)
  async get_centers_for_admin(@Ctx() context: Context): Promise<VaccinationCenterModel[]> {
    let existingCentres = await VaccinationCenterModel.findAll({
      where: {
        admin_id: context.user.user_id,
      },
    });
    if (existingCentres.length == 0) throw new Error("No record found");
    else return existingCentres;
  }

  @Query(() => [VaccinationCenterModel])
  @UseMiddleware(validateUser)
  async get_centers_for_users(@Ctx() context: Context): Promise<VaccinationCenterModel[]> {
    let centres = await VaccinationCenterModel.findAll();
    if (centres.length === 0) throw new Error("No Vaccination Centres Found");
    return centres;
  }

  @Mutation(() => String)
  @UseMiddleware(validateUser)
  async create_center(@Arg("input") input: VaccinationCenterInput, @Ctx() context: Context) {
    let existingCenter = await VaccinationCenterModel.findOne({
      where: {
        name: input.name,
        location: input.location.toLowerCase(),
        admin_id: context.user.user_id,
      },
    });

    if (existingCenter) throw new Error("Vaccination Center Already Exists!");

    let newCenter = await VaccinationCenterModel.create({
      name: input.name,
      location: input.location.toUpperCase(),
      admin_id: context.user.user_id,
    });

    if (newCenter) return "New Center Created";
    else throw new Error("Error in creating vaccination center");
  }

  @Mutation(() => String)
  @UseMiddleware(validateUser)
  async delete_center(@Arg("center_id") centerId: number, @Ctx() context: Context) {
    let existingCenter = await VaccinationCenterModel.findOne({
      where: {
        center_id: centerId,
        admin_id: context.user.user_id,
      },
    });

    if (!existingCenter) throw new Error("Requested Center is not found");

    let appointments = await AppointmentModel.findAll({
      where: {
        center_id: centerId,
      },
    });

    if (appointments.length > 0)
      throw new Error("Cannot delete center because there are appointments scheduled in this center!");

    await existingCenter.destroy();

    return "Successfully deleted Vaccination Center";
  }
}
