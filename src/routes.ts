import { type FastifyInstance } from "fastify";
import {
  registerController,
  loginController,
  createPatientController,
  deletePatientController,
  getPatientsController,
  getPatientByIdController,
  getMeController,
  updatePatientController,
  refreshTokenController,
} from "./controllers/auth.js";
import {
  createAppointmentController,
  deleteAppointmentController,
  getAppointmentByIdController,
  getAppointmentsController,
  updateAppointmentController,
} from "./controllers/appointmentController.js";
import {
  jwtAuthMiddleware,
  requireRoleDoctor,
  requireRoleReceptionist,
} from "./middlewares/jwt.js";

export async function routes(app: FastifyInstance) {
  app.post("/api/auth/register", registerController);

  app.post(
    "/api/auth/login",
    {
      config: { rateLimit: { max: 10, timeWindow: "15 minutes" } },
    },
    loginController,
  );

  app.post(
    "/api/auth/refresh",
    { preHandler: [jwtAuthMiddleware] },
    refreshTokenController,
  );

  app.get("/api/auth/me", { preHandler: [jwtAuthMiddleware] }, getMeController);

  //Patient
  app.post(
    "/api/patients",
    {
      preHandler: [jwtAuthMiddleware, requireRoleReceptionist],
    },
    createPatientController,
  );

  app.get(
    "/api/patients",
    { preHandler: [jwtAuthMiddleware, requireRoleReceptionist] },
    getPatientsController,
  );

  app.get(
    "/api/patients/:id",
    { preHandler: [jwtAuthMiddleware, requireRoleReceptionist] },
    getPatientByIdController,
  );

  app.put(
    "/api/patients/:id",
    { preHandler: [jwtAuthMiddleware, requireRoleReceptionist] },
    updatePatientController,
  );

  app.delete(
    "/api/patients/:id",
    {
      preHandler: [jwtAuthMiddleware, requireRoleReceptionist],
    },
    deletePatientController,
  );

  //Appointment
  app.post(
    "/api/appointments",
    { preHandler: [jwtAuthMiddleware, requireRoleDoctor] },
    createAppointmentController,
  );

  app.put(
    "/api/appointments/:id",
    { preHandler: [jwtAuthMiddleware, requireRoleDoctor] },
    updateAppointmentController,
  );

  app.get(
    "/api/appointments",
    {
      preHandler: [jwtAuthMiddleware, requireRoleReceptionist],
    },
    getAppointmentsController,
  );

  app.get(
    "/api/appointments/:id",
    { preHandler: [jwtAuthMiddleware, requireRoleReceptionist] },
    getAppointmentByIdController,
  );

  app.delete(
    "/api/appointments/:id",
    { preHandler: [jwtAuthMiddleware, requireRoleDoctor] },
    deleteAppointmentController,
  );
}
