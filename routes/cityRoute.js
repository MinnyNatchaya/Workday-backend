const router = require('express').Router();
const cityController = require('../controller/cityController');

router.get('/', cityController.getAllCities);
router.get('/:id', cityController.getCityById);
router.post('/', cityController.createCity);
router.put('/:id', cityController.updateCity);
router.delete('/:id', cityController.deleteCity);

module.exports = router;
