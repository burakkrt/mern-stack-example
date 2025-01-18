const express = require('express');
const router = express.Router();
const Categories = require('../../db/models/Categories');
const Response = require('../../lib/response');
const CustomError = require('../../lib/Error');
const _enum = require('../../config/enum');

router.get('/', async (req, res, next) => {
  try {
    let categories = await Categories.find({});
    res.json(Response.successResponse(categories));
  } catch (error) {
    res.json(Response.errorResponse(error));
  }
});

router.post('/', async (req, res, next) => {
  let body = req.body;
  try {
    if (!body.name) {
      throw new CustomError(
        _enum.HTTP_CODES.BAD_REQUEST,
        'Validation Error!',
        'name filelds must be filled'
      );
    }

    console.log(body);

    let category = new Categories({
      name: body.name,
      is_active: body.is_active,
      created_by: req.user?.id,
    });

    const data = await category.save();

    res.json(Response.successResponse(data));
  } catch (error) {
    let errorResponse = Response.errorResponse(error);
    res.status(errorResponse.statusCode).json(errorResponse);
  }
});

module.exports = router;
