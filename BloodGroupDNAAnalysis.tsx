import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import './BloodGroupDNAAnalysis.css';

interface BloodGroupDNAAnalysisProps {
  onPredictionComplete: (bloodGroup: string, confidence: number) => void;
}

const BloodGroupDNAAnalysis: React.FC<BloodGroupDNAAnalysisProps> = ({ onPredictionComplete }) => {
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load the model when component mounts
  useEffect(() => {
    loadModel();
  }, []);

  const loadModel = async () => {
    try {
      setIsLoading(true);
      const loadedModel = await tf.loadLayersModel('/models/model.json');
      setModel(loadedModel);
      setIsLoading(false);
    } catch (err) {
      setError('Error loading the model. Please try again later.');
      setIsLoading(false);
      console.error('Error loading model:', err);
    }
  };

  const preprocessImage = async (file: File): Promise<tf.Tensor4D> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        try {
          // Create a canvas to resize and process the image
          const canvas = document.createElement('canvas');
          canvas.width = 224;  // Model input size
          canvas.height = 224;
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }

          // Draw and resize image
          ctx.drawImage(img, 0, 0, 224, 224);
          
          // Convert to tensor
          const imageData = ctx.getImageData(0, 0, 224, 224);
          let tensor = tf.browser.fromPixels(imageData)
            .toFloat()
            .div(255.0)  // Normalize pixel values
            .expandDims(0) as tf.Tensor4D;  // Add batch dimension
          
          resolve(tensor);
        } catch (err) {
          reject(err);
        }
      };
      img.onerror = (err) => reject(err);
      img.src = URL.createObjectURL(file);
    });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/bmp'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image file (PNG, JPG, or BMP)');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image size should be less than 10MB');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Check if model is loaded
      if (!model) {
        throw new Error('Model not loaded. Please try again.');
      }

      // Preprocess the image
      const tensor = await preprocessImage(file);
      if (!tensor) {
        throw new Error('Failed to process the image');
      }

      // Make prediction
      const predictions = model.predict(tensor) as tf.Tensor;
      const probabilities = await predictions.data();
      
      // Clean up tensors
      tensor.dispose();
      predictions.dispose();

      // Get blood group with highest probability
      const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
      const maxProbIndex = Array.from(probabilities).indexOf(Math.max(...Array.from(probabilities)));
      const predictedBloodGroup = bloodGroups[maxProbIndex];
      const confidence = probabilities[maxProbIndex] as number;

      // Call the callback with results
      onPredictionComplete(predictedBloodGroup, confidence);
      setIsLoading(false);
    } catch (err) {
      setError('Error processing image. Please try again.');
      setIsLoading(false);
      console.error('Prediction error:', err);
    }
  };

  return (
    <div className="blood-group-analysis">
      <h2>Blood Group Prediction</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="upload-section">
        <input
          type="file"
          accept=".png,.jpg,.jpeg,.bmp"
          onChange={handleImageUpload}
          disabled={isLoading || !model}
        />
        <p className="helper-text">
          Upload a clear fingerprint image (PNG, JPG, or BMP format, max 10MB)
        </p>
      </div>
      {isLoading && <div className="loading">Processing...</div>}
    </div>
  );
};

export default BloodGroupDNAAnalysis; 