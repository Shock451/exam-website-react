// import { APPOINTMENT_STATES } from '../helpers/constants';
import { ROLES } from '../helpers/constants';
import {
    fetchExams,
    fetchMyExams,
    fetchQuestions,
    fetchAnswers,
    fetchHistory,
    createHistory,
    createExam,
    deleteExam,
    // createAppointment,
    // updateAppointment,
    // deleteAppointment,
} from '../models/exam';

function questionParser(questions, includeAnswers = false) {
    let parsedQuestions = {}

    questions.forEach(question => {
        if (question.id in parsedQuestions) {
            parsedQuestions[question.id]["options"].push({
                option: question.option,
                id: question.option_id,
                ...(includeAnswers && {correct: question.option_id === question.answer_id}),
            });
        } else {
            parsedQuestions[question.id] = {
                id: question.id,
                question: question.question,
                options: [{
                    option: question.option,
                    id: question.option_id,
                    ...(includeAnswers && { correct: question.option_id === question.answer_id }),
                }]
            };
        }
    });

    return parsedQuestions;
}

function calculateGrade(score, total) {
    const percentage = (score / total) * 100;
    if (percentage >= 80) {
        return 'A';
    } else if (percentage >= 60) {
        return 'B';
    } else if (percentage >= 50) {
        return 'C';
    } else {
        return 'F'
    }
}

const controller = {

    deleteExam: async (req, res) => {
        let { id } = req.params;
        let deletedExam = await deleteExam(id);

        if (!deletedExam) {
            res.status(500).json({
                err: "An error occured",
            });
            return;
        }

        res.status(200).json({
            msg: "Exam deleted successfully"
        });
    },

    getExams: async (req, res) => {
        // const id = req._id;
        // const role = req._role;
        const exams = await fetchExams();

        res.status(200).json({
            exams,
        });
    },

    getMyExams: async (req, res) => {
        const id = req._id;
        // const role = req._role;
        const exams = await fetchMyExams(id);

        res.status(200).json({
            exams,
        });
    },

    getQuestions: async (req, res) => {
        const role = req._role;
        const { exam_id } = req.query;
        const questions = await fetchQuestions(exam_id);

        const parsedQuestions = questionParser(questions, role === ROLES[1]);

        res.status(200).json({
            questions: parsedQuestions,
        });
    },

    postExam: async (req, res) => {
        const teacher_id = req._id;
        const {title, year, time_limit} = req.body;

        const exam = await createExam({
            title, year, time_limit, teacher_id,
        });

        res.status(200).json({
            exam,
        });
    },

    getHistory: async (req, res) => {
        const user_id = req._id;
        
        const history = await fetchHistory(user_id);

        res.status(200).json({
            history,
        });
    },

    submitAnswers: async (req, res) => {
        const user_id = req._id;

        const { exam_id, data } = req.body;
        const solutions = await fetchAnswers(exam_id);

        let solutionsObject = {};
        solutions.map(solution => {
            solutionsObject[solution.id] = solution.option_id;
        });

        let score = 0;
        Object.keys(data).map(question_id => {
            if (parseInt(data[question_id]) === solutionsObject[question_id]) {
                score++;
            }
        })

        const grade = calculateGrade(score, Object.keys(solutions).length);

        const uploaded = await createHistory({
            user_id,
            exam_id,
            score,
            grade,
            total: solutions.length,
        });

        if (!uploaded) {
            res.status(500).json({
                err: "An error occured"
            })
            return;
        }

        res.status(200).json({
            msg: "Score uploaded successfully",
        });
    }
    // postAppointmentsByToken: async (req, res) => {
    //     const patient_id = req._id;
    //     const { doctor_id, date, description } = req.body;

    //     if (!doctor_id || !date || !description) {
    //         res.status(400).json({
    //             err: "Required: doctor_id, description, date"
    //         });
    //         return;
    //     }

    //     const created = await createAppointment({
    //         patient_id,
    //         doctor_id,
    //         date,
    //         description
    //     });

    //     if (!created) {
    //         res.status(500).json({
    //             err: "An error occured"
    //         })
    //         return;
    //     }

    //     res.status(200).json({
    //         msg: "Appointment created successfully"
    //     });
    // },

    // updateAppointmentStatus: async (req, res) => {
    //     const doctor_id = req._id;
    //     const { id, status } = req.body;

    //     if (!APPOINTMENT_STATES.includes(status)){
    //         res.status(400).json({
    //             err: `${status} is not a valid appointment status`
    //         });
    //         return;
    //     }

    //     const updated = await updateAppointment(doctor_id, id, status);

    //     if (!updated){
    //         res.status(500).json({
    //             err: "An error occured"
    //         });
    //         return;
    //     }

    //     res.status(200).json({
    //         msg: "Status updated successfully"
    //     })
    // },

    // deleteAppointmentById: async (req, res) => {
    //     const patient_id = req._id;
    //     const id = req.params.id;

    //     const deleted = await deleteAppointment(patient_id, id);

    //     if (!deleted) {
    //         res.status(500).json({
    //             err: "An error occured"
    //         });
    //         return;
    //     }

    //     res.status(200).json({
    //         msg: "Appointment deleted successfully"
    //     })
    // }
}

export default controller;