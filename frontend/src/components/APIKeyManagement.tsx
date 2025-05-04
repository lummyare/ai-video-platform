import { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { api } from '@/lib/api';

interface APIKey {
  id: string;
  name: string;
  key: string;
  created_at: string;
  last_used: string;
  is_active: boolean;
}

export default function APIKeyManagement() {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [newKeyName, setNewKeyName] = useState('');
  const [showNewKey, setShowNewKey] = useState<string | null>(null);

  useEffect(() => {
    fetchAPIKeys();
  }, []);

  const fetchAPIKeys = async () => {
    const { data } = await api.get('/developer/api-keys');
    setApiKeys(data);
  };

  const createNewKey = async () => {
    const { data } = await api.post('/developer/api-keys', {
      name: newKeyName
    });
    setShowNewKey(data.key);
    setApiKeys([...apiKeys, data]);
    setNewKeyName('');
  };

  const revokeKey = async (keyId: string) => {
    await api.delete(`/developer/api-keys/${keyId}`);
    setApiKeys(apiKeys.filter(key => key.id !== keyId));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Create New Key */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Create New API Key</h3>
        <div className="flex space-x-4">
          <input
            type="text"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            placeholder="Key name (e.g., Production, Development)"
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={createNewKey}
            disabled={!newKeyName}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Create Key
          </button>
        </div>

        {showNewKey && (
          <div className="mt-4 p-4 bg-yellow-50 rounded">
            <p className="text-sm text-yellow-800 mb-2">
              Make sure to copy your API key now. You won't be able to see it again!
            </p>
            <div className="flex items-center space-x-2">
              <code className="flex-1 p-2 bg-white rounded">{showNewKey}</code>
              <CopyToClipboard text={showNewKey}>
                <button className="p-2 hover:bg-gray-100 rounded">
                  Copy
                </button>
              </CopyToClipboard>
            </div>
          </div>
        )}
      </div>

      {/* API Keys List */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Your API Keys</h3>
        <div className="space-y-4">
          {apiKeys.map(key => (
            <div key={key.id} className="flex items-center justify-between p-4 border rounded">
              <div>
                <h4 className="font-medium">{key.name}</h4>
                <p className="text-sm text-gray-500">
                  Created: {new Date(key.created_at).toLocaleDateString()}
                </p>
                {key.last_used && (
                  <p className="text-sm text-gray-500">
                    Last used: {new Date(key.last_used).toLocaleDateString()}
                  </p>
                )}
              </div>
              <button
                onClick={() => revokeKey(key.id)}
                className="px-3 py-1 text-red-600 hover:bg-red-50 rounded"
              >
                Revoke
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
