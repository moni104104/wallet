import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useRef } from 'react';


function Documents() {
  const [formData, setFormData] = useState({
    customerId: '',
    documentType: '',
    createdBy: '',
    image: null
  });

  const [isDeleting, setIsDeleting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const checkIfExists = async () => {
    const { customerId, documentType } = formData;
    try {
      const res = await fetch(
        `http://localhost:8900/api/document/${customerId}/${documentType}`
      );
      if (res.ok) {
        const existing = await res.json();
        return existing;
      }
    } catch (err) {
      console.error('Error checking document existence:', err);
      toast.error('Error checking existing document');
    }
    return null;
  };

  const deleteExistingDocument = async () => {
    const { customerId, documentType } = formData;
    setIsDeleting(true);
    try {
      const res = await fetch(
        `http://localhost:8900/api/document/${customerId}/${documentType}`,
        {
          method: 'DELETE',
        }
      );
      setIsDeleting(false);
      if (res.ok) {
        return true;
      } else {
        const errorData = await res.json();
        toast.error('Delete failed: ' + (errorData.message || 'Unknown error'));
        return false;
      }
    } catch (err) {
      setIsDeleting(false);
      console.error('Delete error:', err);
      toast.error('Error deleting existing document');
      return false;
    }
  };

  const uploadDocument = async () => {
    const data = new FormData();
    data.append('customerId', formData.customerId);
    data.append('documentType', formData.documentType);
    data.append('createdBy', formData.createdBy);
    data.append('status', 'ACTIVE');
    data.append('createdAt', new Date().toISOString().split('T')[0]);
    data.append('image', formData.image);

    setIsUploading(true);
    try {
      const res = await fetch('http://localhost:8900/api/document', {
        method: 'POST',
        body: data,
      });

      setIsUploading(false);

      if (res.ok) {
        toast.success('Document uploaded!');
        setFormData({ customerId: '', documentType: '', createdBy: '', image: null });
        if (fileInputRef.current) {
         fileInputRef.current.value = '';
}

      } else {
        const errorData = await res.json();
        toast.error('Upload failed: ' + (errorData.message || 'Unknown error'));
      }
    } catch (err) {
      setIsUploading(false);
      console.error('Upload error:', err);
      toast.error('Something went wrong during upload.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.customerId || !formData.documentType || !formData.createdBy) {
      toast.warn('Please fill all required fields.');
      return;
    }
    if (!formData.image) {
      toast.warn('Please select a file to upload.');
      return;
    }

    const existing = await checkIfExists();

    if (existing) {
      const confirmReplace = window.confirm(
        'Document already exists. Do you want to delete the existing document and replace it?'
      );
      if (confirmReplace) {
        const deleted = await deleteExistingDocument();
        if (deleted) {
          await uploadDocument();
        }
      } else {
        toast.info('Upload cancelled by user.');
      }
    } else {
      await uploadDocument();
    }
  };

  const styles = {
    container: {
      maxWidth: '500px',
      margin: '40px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '10px',
      background: '#f9f9f9',
      fontFamily: 'Arial, sans-serif',
    },
    label: { display: 'block', marginBottom: '5px', fontWeight: 'bold' },
    input: {
      marginBottom: '15px',
      padding: '8px',
      width: '100%',
      borderRadius: '5px',
      border: '1px solid #ccc',
      boxSizing: 'border-box',
    },
    button: {
      padding: '10px',
      width: '100%',
      background: '#007BFF',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
    },
    disabledButton: {
      background: '#a0a0a0',
      cursor: 'not-allowed',
    },
    header: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#333',
    },
  };

  return (
    <div style={styles.container}>
      <ToastContainer />
      <h2 style={styles.header}>Upload Document</h2>
      <form onSubmit={handleSubmit}>
        <label style={styles.label}>Customer ID</label>
        <input
          type="number"
          name="customerId"
          value={formData.customerId} className='no-arrow'
          onChange={handleChange}
          required
          style={styles.input}
          min="1"
        />

        <label style={styles.label}>Document Type</label>
        <select
          name="documentType"
          value={formData.documentType}
          onChange={handleChange}
          required
          style={styles.input}
        >
          <option value="">Select Type</option>
          <option value="PAN">PAN</option>
          <option value="AADHAAR">AADHAAR</option>
          <option value="PASSPORT">PASSPORT</option>
          <option value="VOTER">VOTER CARD</option>
          <option value="DRIVING">DRIVING LICENSE</option>
        </select>

        <label style={styles.label}>Created By</label>
        <input
          type="text"
          name="createdBy"
          value={formData.createdBy}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Document Image</label>
        <input
          type="file"
          name="image"
          accept="image/*,application/pdf"
          onChange={handleChange}
          style={styles.input}
          ref= {fileInputRef}
          required
        />

<button type="submit" style={{...styles.button}} disabled={isDeleting || isUploading}>
  Upload
</button>
      </form>
    </div>
  );
}

export default Documents;
