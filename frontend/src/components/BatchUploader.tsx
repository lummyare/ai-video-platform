import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { api } from '@/lib/api';

export default function BatchUploader() {
  const [prompts, setPrompts] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: '.txt,.csv',
    onDrop: async (files) => {
      const file = files[0];
      const text = await file.text();
      setPrompts(text.split('\n').filter(Boolean));
    }
  });

  const handleSubmit = async () => {
    setUploading(true);
    try {
      await api.post('/generation/batch', { prompts });
      // Handle success
    } catch (error) {
      console.error('Batch upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6">
      <div {...getRootProps()} className="border-2 border-dashed p-6 text-center">
        <input {...getInputProps()} />
        <p>Drop a text file with prompts or click to select</p>
      </div>

      {prompts.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold">Prompts ({prompts.length})</h3>
          <div className="mt-2 max-h-60 overflow-y-auto">
            {prompts.map((prompt, i) => (
              <div key={i} className="p-2 bg-gray-50 mb-2 rounded">
                {prompt}
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            disabled={uploading}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            {uploading ? 'Processing...' : 'Start Batch Generation'}
          </button>
        </div>
      )}
    </div>
  );
}
