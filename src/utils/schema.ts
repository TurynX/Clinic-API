import z from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(6),
  role: z.enum(["RECEPTIONIST", "DOCTOR"]),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const patientSchema = z.object({
  name: z.string(),
  phone: z.string(),
  notes: z.string(),
  gender: z.enum(["MALE", "FEMALE"]),
});

export const appointmentSchema = z.object({
  date: z.string(),
  status: z.enum(["SCHEDULED", "CONFIRMED", "MISSED", "REALIZED", "CANCELLED"]),
  patientName: z.string(),
  doctorName: z.string(),
});

export const updateAppointmentSchema = z.object({
  date: z.string(),
  status: z.enum(["SCHEDULED", "CONFIRMED", "MISSED", "REALIZED", "CANCELLED"]),
  patientName: z.string(),
  doctorName: z.string(),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string(),
});
