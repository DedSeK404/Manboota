const express = require("express");
const {
  addPlant,
  getallPlants,
  updatePlant,
} = require("../controllers/plantControllers");
const {
  validator,
  addPlantRules,
} = require("../middlewares/validators/bodyValidators");
const router = express.Router();

/**
 *@method POST /plant/add
 *@description add a new tree/plant
 *@access private
 */

router.post("/add", addPlantRules, validator, addPlant);

/**
 * @route get /plant/
 * @description get all plants
 * @access protected(authenticated)
 */
router.get("/:user", getallPlants);

/**
 * @route patch /plant/edit
 * @description update plant
 * @access protected
 */
router.patch("/edit", updatePlant);

module.exports = router;
