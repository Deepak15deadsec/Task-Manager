const Joi = require('joi');

const validationSchema = {
    // registraction validation
    registerUser :Joi.object().keys({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required(),
    }),
    loginUser : Joi.object().keys({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required(),
    }),
    createTask : Joi.object().keys({
        task:Joi.string().strict(true).min(3).max(255).required(),
        priority:Joi.string().strict(true).valid("HIGH PRIORITY","MODERATE PRIORITY","LOW PRIORITY").required(),
        assignTo:Joi.string().strict(true).min(5).max(255).optional().email(),
        checkList: Joi.array().strict(true).items(
            Joi.object().keys({
                isChecked: Joi.boolean().strict(true).required(),
                value: Joi.string().strict(true).min(3).max(255).required()
            })
        ).unique().optional(),
        dueDate:Joi.date().iso().optional(),
        currentStatus:Joi.string().strict(true).valid("BACKLOG","TODO","INPROGRESS","DONE").min(4).max(255).optional()
    }),
    updateTask : Joi.object().keys({
        // _id: Joi.string().strict(true).required(),
        title:Joi.string().strict(true).min(3).max(255).optional(),
        priority:Joi.string().strict(true).valid("HIGH PRIORITY","MODERATE PRIORITY","LOW PRIORITY").optional(),
        assignTo:Joi.string().strict(true).min(5).max(255).optional().email(),
        checkList: Joi.array().strict(true).items(
            Joi.object().keys({
                isChecked: Joi.boolean().strict(true).required(),
                value: Joi.string().strict(true).min(3).max(255).required()
            })
        ).unique().optional(),
        dueDate:Joi.date().iso().optional(),
        currentStatus:Joi.string().strict(true).valid("BACKLOG","TODO","INPROGRESS","DONE").min(4).max(255).optional()
    }),
    createPeopleMail:Joi.object().keys({
        email: Joi.string().min(5).max(255).required().email()
    }),
}


module.exports = validationSchema;