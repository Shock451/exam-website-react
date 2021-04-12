import jwt from "jsonwebtoken";
import { ROLES } from './../helpers/constants';

const { APP_SECRET } = process.env;

export default {
    authorize: (req, res, next) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, APP_SECRET);
            req._id = decoded['id'];
            req._role = decoded['role'];
            next();
        } catch (error) {
            res.status(401).json({ err: "Authentication failed." });
        }
    },

    only_students: (req, res, next) => {
        let role = req._role;
        if (role !== ROLES[0]) { 
            res.status(400).json({ err: "Authorized students only." });
        } else {
            next();
        }
    },

    only_teachers: (req, res, next) => {
        let role = req._role;
        if (role !== ROLES[1]) { // ROLES[0] is doctorr
            res.status(400).json({ err: "Authorized teachers only." });
        } else {
            next();
        }
    },
    
    only_admins: (req, res, next) => {
        let role = req._role;
        if (role !== ROLES[2]){
            res.status(400).json({err: "Authorized administrators only."});
        } else {
            next();
        }
    }
}