import {constants} from "../constants.js";


export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: 'Validation failed', message: err.message, stackTrace: err.stack })
            break;
        case constants.NOT_FOUND:
            res.json({ title: 'Not Found', message: err.message, stackTrace: err.stack })
            break;
        case constants.FORBIDDEN:
            res.json({ title: 'Forbidden', message: err.message, stackTrace: err.stack })
            break;
        case constants.UNAUTHORIZATION:
            res.json({ title: 'Not Authorized', message: err.message, stackTrace: err.stack })
            break;
        case constants.SERVER_ERROR:
            res.json({ title: 'Sorry, problem with server', message: err.message, stackTrace: err.stack })
            break;
        default:
            console.log('All good');
            break;
    }
   
  
}