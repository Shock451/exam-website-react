import { Router } from "express";
import ExamsController from "../controllers/exams";

import AuthMiddlewares from "../middlewares/auth";

const router = Router();

router.get('/questions', AuthMiddlewares.authorize, ExamsController.getQuestions);

router.get('/history', AuthMiddlewares.authorize, ExamsController.getHistory);

router.post('/submit', AuthMiddlewares.authorize, ExamsController.submitAnswers);

router.get('/me', AuthMiddlewares.authorize, ExamsController.getMyExams);

router.get('/', AuthMiddlewares.authorize, ExamsController.getExams);

router.post('/', AuthMiddlewares.authorize, AuthMiddlewares.only_teachers, ExamsController.postExam);

router.delete('/:id', AuthMiddlewares.authorize, AuthMiddlewares.only_teachers, ExamsController.deleteExam);

// router.patch('/', AuthMiddlewares.authorize, AuthMiddlewares.only_doctors, ExamsController.updateAppointmentStatus);

export default router;
