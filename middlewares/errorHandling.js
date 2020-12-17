module.exports = (err, req, res, next) => {
   let status = 500;
   let msg = "Internal server error";

   if (err.name === "SequelizeValidationError") {
      res.status(status).json({
         status: 'false',
         msg: err.errors[0].message 
      })
   }
}