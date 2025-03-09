export const validateForm = (data) => {
  const validationErrors = {};

  if (!data.country) validationErrors.country = 'Country is required.';
  if (!data.address) validationErrors.address = 'Address is required.';
  if (!data.city) validationErrors.city = 'City is required.';
  if (!data.state) validationErrors.state = 'State is required.';
  if (!data.previewImage) validationErrors.previewImage = 'Preview image is required.';

  if (!data.description) {
      validationErrors.description = 'Description is required.';
  } else if (data.description.length < 30) {
      validationErrors.description = 'Description must be at least 30 characters.';
  }

  if (!data.name) {
      validationErrors.name = 'Name is required.';
  } else if (data.name.length > 50) {
      validationErrors.name = 'Name cannot be longer than 50 characters.';
  }

  if (!data.price) {
      validationErrors.price = 'Price is required.';
  } else if (Number(data.price) <= 0) {
      validationErrors.price = 'Price must be a positive number.';
  }

  if (data.lat) {
      const lat = parseFloat(data.lat);
      if (isNaN(lat) || lat < -90 || lat > 90) {
          validationErrors.lat = 'Latitude must be a number between -90 and 90.';
      }
  }

  if (data.lng) {
      const lng = parseFloat(data.lng);
      if (isNaN(lng) || lng < -180 || lng > 180) {
          validationErrors.lng = 'Longitude must be a number between -180 and 180.';
      }
  }

  return validationErrors;
};