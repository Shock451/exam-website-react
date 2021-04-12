import { Router } from "express";

// import doctorsRouter from "./doctors";
// import patientsRouter from "./patients";
// import chatsRouter from "./chats";
import usersRouter from "./users";
import examsRouter from './exams';
// import medsRefillRouter from './meds-refill';
// import RadiologyRouter from './radiology';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({
        data: "Welcome to Exam website v1"
    });
});

// router.use("/doctors", doctorsRouter);
router.use("/exams", examsRouter);
router.use("/users", usersRouter);
// router.use("/patients", patientsRouter);
// router.use("/chats", chatsRouter);
// router.use("/meds-refill", medsRefillRouter);
// router.use("/radiology", RadiologyRouter);

export default router;