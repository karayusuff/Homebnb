export const validateForm = (data) => {
  const validationErrors = {};
  if (!data.country) validationErrors.country = 'Country is required.';
  if (!data.address) validationErrors.address = 'Address is required.';
  if (!data.city) validationErrors.city = 'City is required.';
  if (!data.state) validationErrors.state = 'State is required.';
  if (data.description.length < 30) validationErrors.description = 'Description must be at least 30 characters.';
  if (!data.description) validationErrors.description = 'Description is required.';
  if (!data.name) validationErrors.name = 'Name is required.';
  if (Number(data.price) <= 0) validationErrors.price = 'Price must be a positive number.';
  if (!data.price) validationErrors.price = 'Price is required.';
  if (!data.previewImage) validationErrors.previewImage = 'Preview image is required.';
  return validationErrors;
};
