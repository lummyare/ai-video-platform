import { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { api } from '@/lib/api';

interface AnalyticsData {
  dailyGenerations: { date: string; count: number }[];
  generationTypes: { type: string; count: number }[];
  successRate: number;
  averageProcessingTime: number;
  creditUsage: { date: string; used: number; remaining: number }[];
  popularPrompts: { prompt: string; count: number }[];
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState('7d'); // 7d, 30d, 90d

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    const { data } = await api.get(`/analytics?range=${timeRange}`);
    setData(data);
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Time Range Selector */}
      <div className="flex space-x-4">
        {['7d', '30d', '90d'].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded ${
              timeRange === range ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Success Rate"
          value={`${(data.successRate * 100).toFixed(1)}%`}
        />
        <MetricCard
          title="Avg. Processing Time"
          value={`${data.averageProcessingTime.toFixed(1)}s`}
        />
        <MetricCard
          title="Total Generations"
          value={data.dailyGenerations.reduce((acc, curr) => acc + curr.count, 0)}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Daily Generations</h3>
          <Line
            data={{
              labels: data.dailyGenerations.map(d => d.date),
              datasets: [{
                label: 'Generations',
                data: data.dailyGenerations.map(d => d.count),
                borderColor: '#2563eb'
              }]
            }}
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Generation Types</h3>
          <Pie
            data={{
              labels: data.generationTypes.map(t => t.type),
              datasets: [{
                data: data.generationTypes.map(t => t.count),
                backgroundColor: ['#2563eb', '#7c3aed', '#db2777']
              }]
            }}
          />
        </div>
      </div>

      {/* Popular Prompts */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Popular Prompts</h3>
        <div className="space-y-2">
          {data.popularPrompts.map((prompt, i) => (
            <div key={i} className="flex justify-between items-center">
              <span className="truncate flex-1">{prompt.prompt}</span>
              <span className="text-gray-500">{prompt.count} uses</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
