const express = require('express');
const router = express.Router();

const Roles = require('../../db/models/Roles');
const Response = require('../../lib/response');
const CustomError = require('../../lib/Error');
const _enum = require('../../config/enum');

router.get('/', async (req, res, next) => {
  try {
    let roles = await Roles.find({});
    res.json(Response.successResponse(roles, _enum.HTTP_CODES.OK));
  } catch (error) {
    let errorResponse = Response.errorResponse(error);
    res.status(errorResponse.statusCode).json(errorResponse);
  }
});

router.post('/', async (req, res, next) => {
  let body = req.body;
  try {
    if (!body.role_name) {
      throw new CustomError(
        _enum.HTTP_CODES.BAD_REQUEST,
        'Validation Error!',
        'role_name filelds must be filled'
      );
    }

    const existingRoles = await Roles.findOne({ role_name: body.role_name });

    if (existingRoles) {
      throw new CustomError(
        _enum.HTTP_CODES.CONFLICT,
        'Duplicate Error!',
        'A role_name with this name already exists.'
      );
    }

    let role = new Roles({
      role_name: body.role_name,
      is_active: body.is_active,
      created_by: req.user?.id,
    });

    const data = await role.save();

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
        'role id field must be filled'
      );
    }
    let updates = {};
    if (body.role_name) updates.role_name = body.role_name;
    if (typeof body.is_active === 'boolean') updates.is_active = body.is_active;

    const data = await Roles.findOneAndUpdate({ _id: body._id }, updates);

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
        'role id field must be filled'
      );
    }

    const data = await Roles.findOneAndDelete({ _id: body._id });

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
