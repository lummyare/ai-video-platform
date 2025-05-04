const onSubmit = async (data: GenerationForm) => {
    setGenerating(true);
    setError(null);
    try {
      const response = await api.post('/generation/text-to-video', data);
      console.log('API Response:', response.data); // Add this line
      setResult(response.data.video_url);
    } catch (error: any) {
      console.error('Generation failed:', error);
      const errorMessage = error.response?.data?.detail || 
                          error.message || 
                          'Failed to generate video. Please try again.';
      setError(errorMessage);
    } finally {
      setGenerating(false);
    }
};
