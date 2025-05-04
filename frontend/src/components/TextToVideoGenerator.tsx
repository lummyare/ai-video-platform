import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../lib/api';

interface GenerationForm {
  prompt: string;
}

export default function TextToVideoGenerator() {
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit } = useForm<GenerationForm>();

  const onSubmit = async (data: GenerationForm) => {
    setGenerating(true);
    setError(null);
    try {
      const response = await api.post('/generation/text-to-video', data);
      setResult(response.data.video_url);
    } catch (error) {
      console.error('Generation failed:', error);
      setError('Failed to generate video. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Text to Video Generation</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
              Enter your prompt
            </label>
            <textarea
              {...register('prompt', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Describe the video you want to generate..."
              rows={4}
            />
          </div>
          <button
            type="submit"
            disabled={generating}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              generating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {generating ? 'Generating...' : 'Generate Video'}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {result && (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Generated Video</h3>
          <video 
            src={result} 
            controls 
            className="w-full rounded-lg"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}
