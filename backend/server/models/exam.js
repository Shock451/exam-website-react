// import { ROLES } from "../helpers/constants.js";
import { doQueryParams } from "../setup/db.js";

export const fetchExams = async () => {
    let query = `SELECT * FROM exams`;
    return doQueryParams(query);
}

export const fetchAnswers = async (id) => {
    let query = `
        SELECT id, option_id FROM questions WHERE exam_id = ?
    `;
    return doQueryParams(query, [id]);
}

export const fetchQuestions = async (id) => {
    let query = `
        SELECT 
        questions.id, questions.exam_id, questions.question, options.id AS option_id, options.option 
        FROM questions 
        INNER JOIN options 
        ON questions.id = options.question_id 
        WHERE questions.exam_id = ?
    `;
    return doQueryParams(query, [id]);
}

// export const createAppointment = async (data) => {
//     let query = `INSERT INTO appointments SET ?`;
//     const response = await doQueryParams(query, data);
//     if (response.affectedRows === 1) {
//         return true;
//     }
//     return false;
// }

// export const updateAppointment = async (doctor_id, id, status) => {
//     let query = `UPDATE appointments SET status = ? WHERE doctor_id = ? AND id = ?`;
//     const response = await doQueryParams(query, [status, doctor_id, id]);
//     if (response.affectedRows === 1){
//         return true;
//     }
//     return false;
// }

// export const deleteAppointment = async (patient_id, id) => {
//     let query = `DELETE FROM appointments WHERE patient_id = ? AND id = ?`;
//     const response = await doQueryParams(query, [patient_id, id]);
//     if (response.affectedRows === 1) {
//         return true;
//     }
//     return false;
// }