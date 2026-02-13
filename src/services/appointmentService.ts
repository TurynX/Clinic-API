import { prisma } from "../lib/db.js";
import { redis } from "../lib/redis.js";
import { Status } from "@prisma/client";

export async function createAppointmentService(
  date: string,
  status: Status,
  patientName: string,
  doctorName: string,
) {
  const patient = await prisma.patient.findFirst({
    where: { name: patientName },
    select: {
      id: true,
    },
  });

  const doctor = await prisma.user.findFirst({
    where: { name: doctorName },
    select: {
      id: true,
    },
  });

  if (!patient || !doctor) {
    throw new Error("Patient or doctor not found");
  }

  const appointment = await prisma.appointment.create({
    data: {
      date,
      status,
      patientName,
      doctorName,
      patientId: patient.id,
      doctorId: doctor.id,
    },
  });

  return appointment;
}

export async function getAppointmentsService(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    throw new Error("User not found");
  }

  if (user.role === "DOCTOR") {
    const cachedAppointmentsDoctor = await redis.get(`appointments${user.id}`);
    if (cachedAppointmentsDoctor) {
      return JSON.parse(cachedAppointmentsDoctor);
    }
    const appointments = await prisma.appointment.findMany({
      where: { doctorId: user.id },
    });

    await redis.set(`appointments${user.id}`, JSON.stringify(appointments));

    return appointments;
  }

  const appointments = await prisma.appointment.findMany();

  await redis.set(`appointments`, JSON.stringify(appointments));

  return appointments;
}

export async function getAppointmentServiceById(id: string) {
  const appointment = await prisma.appointment.findUnique({
    where: { id },
  });

  if (!appointment) {
    throw new Error("Appointment not found");
  }
  return appointment;
}

export async function updateAppointmentService(id: string, data: any) {
  const appointment = await prisma.appointment.update({
    where: { id },
    data: {
      status: data.status,
      date: data.date,
      patientName: data.patientName,
      doctorName: data.doctorName,
      patientId: data.patientId,
      doctorId: data.doctorId,
    },
  });
  return appointment;
}

export async function deleteAppointmentService(id: string) {
  const appointment = await prisma.appointment.delete({
    where: { id },
  });

  if (!appointment) {
    throw new Error("Appointment not found");
  }
  return appointment;
}
