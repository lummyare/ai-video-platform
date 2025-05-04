import Layout from '../components/Layout';
import TextToVideoGenerator from '../components/TextToVideoGenerator';

export default function Home() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Generate Videos with AI</h1>
        <TextToVideoGenerator />
      </div>
    </Layout>
  );
}
