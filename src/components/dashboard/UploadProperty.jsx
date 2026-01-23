import React, { useState } from 'react';
import { Upload, X, Home, MapPin, DollarSign, Type, FileText, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const UploadProperty = () => {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        location: '',
        type: 'House',
        beds: '',
        baths: '',
        area: '',
        description: '',
        features: '',
    });

    const [images, setImages] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => URL.createObjectURL(file));
        setImages(prev => [...prev, ...newImages]);
    };

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="upload-property-container"
        >
            <div className="dashboard-header">
                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Upload New Property</h2>
                <p style={{ color: 'var(--text-light)' }}>Add a new listing to your real estate portfolio</p>
            </div>

            <div className="upload-form-grid">
                <div className="form-section main-info">
                    <div className="card">
                        <h3>Basic Information</h3>
                        <div className="input-group">
                            <label><FileText size={16} /> Property Title</label>
                            <input
                                type="text"
                                name="title"
                                placeholder="e.g. Modern Villa with Sea View"
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="input-row">
                            <div className="input-group">
                                <label><DollarSign size={16} /> Price ($)</label>
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="e.g. 500000"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="input-group">
                                <label><Type size={16} /> Category</label>
                                <select name="type" value={formData.type} onChange={handleInputChange}>
                                    <option>House</option>
                                    <option>Apartment</option>
                                    <option>Villa</option>
                                    <option>Condo</option>
                                    <option>Townhouse</option>
                                    <option>Penthouse</option>
                                </select>
                            </div>
                        </div>

                        <div className="input-group">
                            <label><MapPin size={16} /> Location</label>
                            <input
                                type="text"
                                name="location"
                                placeholder="e.g. Beverly Hills, CA"
                                value={formData.location}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="input-row-3">
                            <div className="input-group">
                                <label>Bedrooms</label>
                                <input type="number" name="beds" placeholder="3" value={formData.beds} onChange={handleInputChange} />
                            </div>
                            <div className="input-group">
                                <label>Bathrooms</label>
                                <input type="number" name="baths" placeholder="2" value={formData.baths} onChange={handleInputChange} />
                            </div>
                            <div className="input-group">
                                <label>Area (sqft)</label>
                                <input type="number" name="area" placeholder="2500" value={formData.area} onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Description</label>
                            <textarea
                                name="description"
                                rows="5"
                                placeholder="Describe the property's unique features..."
                                value={formData.description}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className="form-section media-info">
                    <div className="card">
                        <h3>Media Gallery</h3>
                        <div className="image-upload-area">
                            <input
                                type="file"
                                id="image-input"
                                multiple
                                accept="image/*"
                                onChange={handleImageUpload}
                                hidden
                            />
                            <label htmlFor="image-input" className="upload-placeholder">
                                <Upload size={40} />
                                <p>Click or drag to upload images</p>
                                <span>Support JPEG, PNG, WEBP</span>
                            </label>
                        </div>

                        {images.length > 0 && (
                            <div className="image-preview-grid">
                                {images.map((img, index) => (
                                    <div key={index} className="preview-card">
                                        <img src={img} alt="preview" />
                                        <button className="remove-img" onClick={() => removeImage(index)}>
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="card" style={{ marginTop: '1.5rem' }}>
                        <h3>Additional Features</h3>
                        <div className="input-group">
                            <textarea
                                name="features"
                                rows="4"
                                placeholder="e.g. Swimming Pool, Garden, Smart Home, Security System (comma separated)"
                                value={formData.features}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                    </div>

                    <button className="btn btn-accent full-width-btn" style={{ marginTop: '1.5rem', height: '3.5rem', fontSize: '1.1rem' }}>
                        Publish Property
                    </button>
                </div>
            </div>

            <style jsx>{`
        .upload-property-container {
          padding-bottom: 2rem;
        }
        .dashboard-header {
          margin-bottom: 2rem;
        }
        .upload-form-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 1.5rem;
        }
        .card {
          background: white;
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          border: 1px solid rgba(0,0,0,0.05);
        }
        .card h3 {
          margin-bottom: 1.5rem;
          font-size: 1.25rem;
          color: var(--primary);
        }
        .input-group {
          margin-bottom: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .input-group label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-light);
        }
        .input-group input, 
        .input-group select, 
        .input-group textarea {
          padding: 0.8rem 1rem;
          border: 1px solid #e0e0e0;
          border-radius: var(--radius-md);
          font-family: var(--font-body);
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }
        .input-group input:focus, 
        .input-group select:focus, 
        .input-group textarea:focus {
          outline: none;
          border-color: var(--accent);
          background-color: #f8faff;
        }
        .input-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .input-row-3 {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1rem;
        }
        .image-upload-area {
          border: 2px dashed #ddd;
          border-radius: var(--radius-md);
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
          background: #fafafa;
        }
        .image-upload-area:hover {
          border-color: var(--accent);
          background: #f0f5ff;
        }
        .upload-placeholder {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-light);
        }
        .upload-placeholder p {
          font-weight: 500;
          color: var(--primary);
        }
        .upload-placeholder span {
          font-size: 0.8rem;
        }
        .image-preview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
          gap: 0.75rem;
          margin-top: 1.5rem;
        }
        .preview-card {
          position: relative;
          aspect-ratio: 1;
          border-radius: var(--radius-sm);
          overflow: hidden;
        }
        .preview-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .remove-img {
          position: absolute;
          top: 4px;
          right: 4px;
          background: rgba(0,0,0,0.5);
          color: white;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .full-width-btn {
          width: 100%;
        }

        @media (max-width: 1024px) {
          .upload-form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </motion.div>
    );
};

export default UploadProperty;
