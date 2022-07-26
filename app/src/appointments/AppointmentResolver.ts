import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Context } from "../contexts/Context";
import moment from "moment";
import { AppointmentModel } from "./AppointmentModel";
import { Op } from "sequelize";
import { validateUser } from "../middlewares/validateUser";
import { UserModel } from "../auth/UserModel";
import { VaccinationCenterModel } from "../vaccination_center/VaccinationCenterModel";

@InputType()
class AppointmentInput {
  @Field()
  public vaccine_type: "COVAXIN" | "COVISHIELD";
  @Field()
  public center_id: number;
  @Field()
  public appointment_time: Date;
}

@Resolver()
export class AppointmentResolver {
  @Query(() => [AppointmentModel])
  @UseMiddleware(validateUser)
  async get_active_appointments(@Ctx() context: Context): Promise<AppointmentModel[]> {
    let activeAppointments = await AppointmentModel.findAll({
      where: {
        user_id: context.user.user_id,
        appointment_time: {
          [Op.gte]: moment(new Date().setHours(0, 0, 0, 0)),
        },
      },
      order: [["appointment_time", "ASC"]],
      include: [UserModel, VaccinationCenterModel],
    });

    if (activeAppointments.length === 0) throw new Error("There are no active appointments");
    else return activeAppointments;
  }

  @Query(() => [AppointmentModel])
  @UseMiddleware(validateUser)
  async get_inactive_appointments(@Ctx() context: Context): Promise<AppointmentModel[]> {
    let inActiveAppointments = await AppointmentModel.findAll({
      where: {
        user_id: context.user.user_id,
        appointment_time: {
          [Op.lt]: moment(new Date()),
        },
      },
      order: [["appointment_time", "ASC"]],
      include: [UserModel, VaccinationCenterModel],
    });

    if (inActiveAppointments.length === 0) throw new Error("There are no active appointments");
    else return inActiveAppointments;
  }

  @Mutation(() => String)
  @UseMiddleware(validateUser)
  async cancel_appointment(@Arg("appointment_id") appointmentId: number, @Ctx() context: Context) {
    let appointment = await AppointmentModel.findOne({
      where: {
        appointment_id: appointmentId,
        user_id: context.user.user_id,
      },
    });

    if (!appointment) throw new Error("Appointment cannot be found");
    await appointment.destroy();

    return "Cancelled the appointment successfully";
  }

  @Mutation(() => String)
  @UseMiddleware(validateUser)
  async create_appointment(@Arg("input") input: AppointmentInput, @Ctx() context: Context) {
    const Day_Start = moment(input.appointment_time).format("YYYY-MM-DD 00:00");
    const Day_End = moment(input.appointment_time).format("YYYY-MM-DD 23:59");
    let activeAppointments = await AppointmentModel.findAll({
      where: {
        center_id: input.center_id,
        appointment_time: {
          [Op.between]: [Day_Start, Day_End],
        },
      },
    });

    if (activeAppointments.length >= 10) throw new Error("Appointment Limit exceeded for the day");

    const newAppointment = await AppointmentModel.create({
      user_id: context.user.user_id,
      center_id: input.center_id,
      appointment_time: input.appointment_time,
      vaccine_type: input.vaccine_type,
    });

    if (newAppointment) return "Appointment Created Successfully";
    else throw new Error("Error while creating a new appointment");
  }
}
