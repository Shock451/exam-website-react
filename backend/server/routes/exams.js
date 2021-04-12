import { Router } from "express";
import ExamsController from "../controllers/exams";

import AuthMiddlewares from "../middlewares/auth";

const router = Router();

router.get('/', AuthMiddlewares.authorize, ExamsController.getExams);

router.get('/questions', AuthMiddlewares.authorize, ExamsController.getQuestions);

router.post('/submit', AuthMiddlewares.authorize, ExamsController.submitAnswers);

// router.delete('/:id', AuthMiddlewares.authorize, AuthMiddlewares.only_patients, ExamsController.deleteAppointmentById);

// router.patch('/', AuthMiddlewares.authorize, AuthMiddlewares.only_doctors, ExamsController.updateAppointmentStatus);

export default router;
