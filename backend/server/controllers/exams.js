// import { APPOINTMENT_STATES } from '../helpers/constants';
import {
    fetchExams,
    fetchQuestions,
    // createAppointment,
    // updateAppointment,
    // deleteAppointment,
} from '../models/exam';

const controller = {

    getExams: async (req, res) => {
        // const id = req._id;
        // const role = req._role;
        const exams = await fetchExams();

        res.status(200).json({
            exams,
        });
    },

    getQuestions: async (req, res) => {
        const { exam_id } = req.query;
        // const role = req._role;
        const questions = await fetchQuestions(exam_id);

        let parsedQuestions = {
            // 2: {
            //     id,
            //     text:
            //     options:[
            //         {
            //             text,
            //             id, 
            //         }
            //     ]
            // }
        }

        questions.forEach(question => {
            if (question.id in parsedQuestions){
                parsedQuestions[question.id]["options"].push({
                    option: question.option,
                    id: question.option_id,
                });
            } else {
                parsedQuestions[question.id] = {
                    id: question.id,
                    question: question.question,
                    options: [{
                        option: question.option,
                        id: question.option_id,
                    }]
                };
            }
        });

        res.status(200).json({
            questions: parsedQuestions,
        });
    },

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