/**
 * Artist controller. Handles requests to /artist resource
 * @author vmlacic
 * @todo Implement functions
 */
'use strict';

const { statusCodes, InternalError }= require('../utils');
const { SingleItemResponse, ListItemResponse } = require('../utils/response');

const getAll = (req, res, next) => {
};

const getById = (req, res, next) => {
};

const getSongs = (req, res, next) => {
};

const getAlbums = (req, res, next) => {
};

const getGenres = (req, res, next) => {
};

const updateById = (req, res, next) => {
};

const deleteById = (req, res, next) => {
};

module.exports = {
  getAll,
  getById,
  getSongs,
  getAlbums,
  getGenres,
  updateById,
  deleteById,
};
