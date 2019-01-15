/**
 * Helper method. Higher order function. Validates and updates instance.
 * @author vmlacic
 */
'use strict';

const InternalError = require('./InternalError');
const { SingleItemResponse } = require('./response');
const statusCodes = require('./statusCodes');

const updateInstanceById = ({
  modelName,
  validProperties,
  validImmutableProperties,
}) => (req, res, next) => {
  const model = req.app.get('models')[modelName];
  const newInstance = req.body[modelName.toLowerCase()];
  const idParamName = modelName.toLowerCase() + 'Id';
  const id = req.params[idParamName];

  try {
    validateInstance({
      instance: newInstance,
      validProperties,
      validImmutableProperties
    });

  } catch (err) {
    next(err);

  }

  model.findOne({ where: { id } })
  .then(instance => {
    if (instance === null) throw new InternalError(statusCodes.nonExistingResource);
    return updateInstance(instance, newInstance);
  })
  .then(instance => {
    const data = {};
    data[modelName.toLowerCase()] = instance;
    const response = new SingleItemResponse(statusCodes.OK, data);
    res.status(200).send(response);
  })
  .catch(err => next(err));
};

const validateInstance = ({ instance, validProperties, validImmutableProperties }) => {
  const properties = Object.keys(instance);
  
  properties.forEach(property => {
    if (![...validProperties, ...validImmutableProperties].includes(property)) {
      throw new InternalError(
        statusCodes.validationError,
        `${property} is not a field in the ${model} model.`,
      );

    } else if (validImmutableProperties.includes(property)) {
      throw new InternalError(
        statusCodes.validationError,
        `You are not allowed to change ${property} of the ${model} model.`,
      );

    }
  });
};

const updateInstance = async (instance, newInstance) => {
  const properties = Object.keys(newInstance);

  properties.forEach(property => instance.set(property, newInstance[property]));
  await instance.save();

  return instance;
};

module.exports = updateInstanceById;