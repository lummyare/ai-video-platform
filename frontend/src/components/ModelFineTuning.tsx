import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { api } from '@/lib/api';

interface Dataset {
  id: string;
  name: string;
  size: number;
  status: string;
  progress: number;
}

interface FineTuningJob {
  id: string;
  model: string;
  dataset: string;
  status: string;
  metrics: {
    loss: number;
    accuracy: number;
  };
  created_at: string;
}

export default function ModelFineTuning() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [jobs, setJobs] = useState<FineTuningJob[]>([]);
  const [selectedModel, setSelectedModel] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    accept: '.zip,.json',
    onDrop: async (files) => {
      const formData = new FormData();
      formData.append('dataset', files[0]);
      const { data } = await api.post('/fine-tuning/datasets', formData);
      setDatasets([...datasets, data]);
    }
  });

  const startFineTuning = async (datasetId: string) => {
    const { data } = await api.post('/fine-tuning/jobs', {
      model: selectedModel,
      dataset_id: datasetId
    });
    setJobs([...jobs, data]);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Dataset Upload */}
      <div {...getRootProps()} className="border-2 border-dashed p-6">
        <input {...getInputProps()} />
        <p>Drop your training dataset here</p>
      </div>

      {/* Datasets List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Your Datasets</h3>
        {datasets.map(dataset => (
          <div key={dataset.id} className="border p-4 rounded">
            <div className="flex justify-between">
              <span>{dataset.name}</span>
              <span>{dataset.status}</span>
            </div>
            {dataset.status === 'processing' && (
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${dataset.progress}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Fine-tuning Jobs */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Fine-tuning Jobs</h3>
        {jobs.map(job => (
          <div key={job.id} className="border p-4 rounded">
            <div className="flex justify-between">
              <span>{job.model}</span>
              <span>{job.status}</span>
            </div>
            {job.metrics && (
              <div className="mt-2 text-sm">
                <p>Loss: {job.metrics.loss}</p>
                <p>Accuracy: {job.metrics.accuracy}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
