const { body, check, validationResult } = require("express-validator");
const customError = (errors) => errors.map((e) => ({ msg: e.msg }));

module.exports.registerRules = [
  body("name")
    .notEmpty()
    .trim()
    .isLength({ min: 5, max: 15 })
    .withMessage("username must be more than 3 and less than 15 characters"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .trim()
    .withMessage("enter a valid email "),
  body("password")
    .isLength({ min: 8 })
    .withMessage("password cannot be less than 8 characters"),
];

module.exports.loginRules = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .trim()
    .withMessage("enter a valid email "),
  body("password")
    .isLength({ min: 8 })
    .withMessage("password cannot be less than 8 characters"),
];

module.exports.AddPetRules = [
  body("name")
    .notEmpty()
    .trim()
    .isLength({ min: 1 })
    .withMessage("name must have atleast 1 character"),
  body("breed")
    .notEmpty()
    .trim()
    .isLength({ min: 1 })
    .withMessage("breed must have atleast 1 character"),
  body("gender").notEmpty().withMessage("please choose your pet's gender"),
  body("birth_date")
    .isISO8601()
    .toDate()
    .withMessage("please select a valid date"),
  check("birth_date").custom((value) => {
    let enteredDate = new Date(value);
    let todaysDate = new Date();

    if (enteredDate < todaysDate) {
      return true;
    }
    throw new Error("please enter a valid date");
  }),
];

module.exports.addPlantRules = [
  body("name")
    .notEmpty()
    .trim()
    .isLength({ min: 1 })
    .withMessage("name/number must have atleast 1 character"),
];

// module.exports.PostOfferRules = [
//   body("description")
//     .notEmpty()
//     .trim()
//     .isLength({ min: 10 })
//     .withMessage("Description must have atleast 10 character"),
//   body("pet").notEmpty().withMessage("Please select a pet"),
//   body("price")
//     .notEmpty()
//     .isNumeric()
//     .withMessage("please enter a valid price"),
//   body("start_date").notEmpty().withMessage("Please select a starting date"),
//   check("start_date").custom((value) => {
//     let enteredDate = new Date(value);
//     let todaysDate = new Date();

//     if (
//       enteredDate.toDateString() === todaysDate.toDateString() ||
//       enteredDate > todaysDate
//     ) {
//       return true;
//     }
//     throw new Error("please enter a valid starting date");
//   }),
//   body("end_date").notEmpty().withMessage("Please select a finishing date"),
//   check("end_date").custom((value) => {
//     let enteredDate = new Date(value);
//     let todaysDate = new Date();
//     if (enteredDate < todaysDate) {
//       throw new Error("please enter a valid finishing date");
//     }
//     return true;
//   }),
// ];

module.exports.validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: customError(errors.array()) });
  }
  return next();
};
