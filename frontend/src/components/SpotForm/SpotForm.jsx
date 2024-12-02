import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createSpotThunk, updateSpotThunk } from '../../store/spots';
import { validateForm } from '../../utils/validation';
import './SpotForm.css';

const SpotForm = ({ formType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { spotId } = useParams();

  const spots = useSelector((state) => state.spots.spots);
  const currentSpot = formType === 'update' 
    ? spots.find((spot) => spot.id === parseInt(spotId)) 
    : null;

  const [formData, setFormData] = useState({
    country: '',
    address: '',
    city: '',
    state: '',
    lat: '',
    lng: '',
    description: '',
    name: '',
    price: '',
    previewImage: '',
    images: ['', '', '', ''],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (formType === 'update' && currentSpot) {
      setFormData({
        country: currentSpot.country || '',
        address: currentSpot.address || '',
        city: currentSpot.city || '',
        state: currentSpot.state || '',
        lat: currentSpot.lat || '',
        lng: currentSpot.lng || '',
        description: currentSpot.description || '',
        name: currentSpot.name || '',
        price: currentSpot.price || '',
        previewImage: currentSpot.previewImage || '',
        images: ['', '', '', ''],
      });
    }
  }, [formType, currentSpot]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prevData) => ({ ...prevData, images: newImages }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const updatedFormData = {
      ...formData,
      lat: formData.lat || '0.0000',
      lng: formData.lng || '0.0000',
      images: formData.images.filter((url) => url),
    };

    if (formType === 'update') {
      const result = await dispatch(updateSpotThunk(spotId, updatedFormData));
      if (result.errors) {
        setErrors(result.errors);
      } else {
        navigate(`/spots/${result.id}`);
      }
    } else {
      const result = await dispatch(createSpotThunk(updatedFormData));
      if (result.errors) {
        setErrors(result.errors);
      } else {
        navigate(`/spots/${result.id}`);
      }
    }
  };
  
  return (
    <div className="spot-form-container">
      <h2>{formType === 'update' ? 'Update your Spot' : 'Create a New Spot'}</h2>
      {errors.general && <p className="error">{errors.general}</p>}
      <form className="spot-form" onSubmit={handleSubmit}>
        <section>
          <h3>Where&apos;s your place located?</h3>
          <p>Guests will only get your exact address once they booked a reservation.</p>
          <div>
            <label>Country</label>
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
            />
            {errors.country && <p className="error">{errors.country}</p>}
          </div>
          <div>
            <label>Street Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Street Address"
            />
            {errors.address && <p className="error">{errors.address}</p>}
          </div>
          <div>
            <label>City</label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
            />
            {errors.city && <p className="error">{errors.city}</p>}
          </div>
          <div>
            <label>State</label>
            <input
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
            />
            {errors.state && <p className="error">{errors.state}</p>}
          </div>
          <div>
            <label>Latitude (Optional)</label>
            <input
              name="lat"
              type="number"
              value={formData.lat}
              onChange={handleChange}
              placeholder="Latitude"
              step="0.0001"
            />
          </div>
          <div>
            <label>Longitude (Optional)</label>
            <input
              name="lng"
              type="number"
              value={formData.lng}
              onChange={handleChange}
              placeholder="Longitude"
              step="0.0001"
            />
          </div>
        </section>
        <section>
          <h3>Describe your place to guests</h3>
          <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Please write at least 30 characters"
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </section>
        <section>
          <h3>Create a title for your spot</h3>
          <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name of your spot"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </section>
        <section>
          <h3>Set a base price for your spot</h3>
          <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price per night (USD)"
          />
          {errors.price && <p className="error">{errors.price}</p>}
        </section>
        <section>
          <h3>Liven up your spot with photos</h3>
          <p>Submit a link to at least one photo to publish your spot.</p>
          <div>
            <label>Preview Image URL</label>
            <input
              name="previewImage"
              value={formData.previewImage}
              onChange={handleChange}
              placeholder="Preview Image URL"
            />
            {errors.previewImage && <p className="error">{errors.previewImage}</p>}
          </div>
          {[...Array(4)].map((_, index) => (
            <div key={index}>
              <label>Image URL</label>
              <input
                value={formData.images[index]}
                onChange={(e) => handleImageChange(index, e.target.value)}
                placeholder="Image URL"
              />
            </div>
          ))}
        </section>
        <button type="submit">{formType === 'update' ? 'Update your Spot' : 'Create Spot'}</button>
      </form>
    </div>
  );
};

export default SpotForm;

