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

    const existingCategory = await Categories.findOne({ name: body.name });

    if (existingCategory) {
      throw new CustomError(
        _enum.HTTP_CODES.CONFLICT,
        'Duplicate Error!',
        'A category with this name already exists.'
      );
    }

    let category = new Categories({
      name: body.name,
      is_active: body.is_active,
      created_by: req.user?.id,
    });

    const data = await category.save();

    res.json(Response.successResponse(data, _enum.HTTP_CODES.CREATED));
  } catch (error) {
    let errorResponse = Response.errorResponse(error);
    res.status(errorResponse.statusCode).json(errorResponse);
  }
});

router.patch('/', async (req, res, next) => {
  let body = req.body;
  try {
    if (!body._id) {
      throw new CustomError(
        _enum.HTTP_CODES.BAD_REQUEST,
        'Validation error!',
        'category id field must be filled'
      );
    }
    let updates = {};
    if (body.name) updates.name = body.name;
    if (typeof body.is_active === 'boolean') updates.is_active = body.is_active;

    const data = await Categories.findOneAndUpdate({ _id: body._id }, updates);

    res.json(Response.successResponse(data));
  } catch (error) {
    let errorResponse = Response.errorResponse(error);
    res.status(errorResponse.statusCode).json(errorResponse);
  }
});

router.delete('/', async (req, res, next) => {
  let body = req.body;
  try {
    if (!body._id) {
      throw new CustomError(
        _enum.HTTP_CODES.BAD_REQUEST,
        'Validation error!',
        'category id field must be filled'
      );
    }

    const data = await Categories.findOneAndDelete({ _id: body._id });

    if (data) {
      res.json(Response.successResponse(data));
    } else {
      throw new CustomError(
        _enum.HTTP_CODES.GONE,
        'No data found',
        'The data to be processed may not be found or may have been previously deleted.'
      );
    }
  } catch (error) {
    let errorResponse = Response.errorResponse(error);
    res.status(errorResponse.statusCode).json(errorResponse);
  }
});

module.exports = router;
