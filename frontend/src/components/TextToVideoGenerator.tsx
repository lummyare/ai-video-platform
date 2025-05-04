import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '@/lib/api';

interface GenerationForm {
  prompt: string;
}

export default function TextToVideoGenerator() {
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<GenerationForm>();

  const onSubmit = async (data: GenerationForm) => {
    setGenerating(true);
    try {
      const response = await api.post('/generation/text-to-video', data);
      setResult(response.data.video_url);
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Text to Video Generation</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Enter your prompt
          </label>
          <textarea
            {...register('prompt', { required: 'Prompt is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={4}
            placeholder="Describe the video you want to generate..."
          />
          {errors.prompt && (
            <p className="mt-1 text-sm text-red-600">{errors.prompt.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={generating}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            generating
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {generating ? 'Generating...' : 'Generate Video'}
        </button>
      </form>

      {result && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Generated Video</h2>
          <video
            src={result}
            controls
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
}
