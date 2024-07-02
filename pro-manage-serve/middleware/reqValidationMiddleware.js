module.exports={
    request_validation: function (schema) {
        return async (req, res, next) => {
          // const { error } = Joi.validate(req.body, schema);
          //console.log(schema)
          const { error } = schema.validate(req.body);
          console.log("%%%%%%%%%%%%%%error", error)
          const valid = error == null;
          console.log("error================", error);
          if (valid) {
            next();
          } else {
            await this.failActionFunction(res, error);
          }
        };
      },
      failActionFunction: function (reply, error) {
        console.log("error.details=====================>", JSON.stringify(error));
        var errorMSG = error.details[0].message;
        var data = {
          data: error.details[0].context.key,
          success:false
        };
        data.message = errorMSG.toString().replace(/\\/g, " ");
        return reply.status(400).send(data);
      },
}