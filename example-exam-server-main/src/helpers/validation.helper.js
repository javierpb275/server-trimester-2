const validateObjectProperties = (someObject, allowedProperties) => {
  const objectProperties = Object.keys(someObject);
  const isValid = objectProperties.every((property) =>
    allowedProperties.includes(property)
  );
  return isValid;
};

module.exports = {
  validateObjectProperties,
};
