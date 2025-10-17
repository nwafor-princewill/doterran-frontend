import React, { useState, useEffect } from 'react';
import { Mail, Calendar, Download } from 'lucide-react';
import { apiService } from '../../services/api';

interface Subscriber {
  _id: string;
  email: string;
  subscribedAt: string;
  isActive: boolean;
}

const Subscribers: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubscribers();
  }, []);

  const loadSubscribers = async () => {
    // You'll need to add this method to your apiService
    const response = await apiService.getSubscribers();
    if (response.data) {
      setSubscribers(response.data);
    }
    setLoading(false);
  };

  const exportSubscribers = () => {
    const csv = subscribers.map(sub => 
      `${sub.email},${new Date(sub.subscribedAt).toLocaleDateString()},${sub.isActive}`
    ).join('\n');
    
    const blob = new Blob([`Email,Subscribed Date,Active\n${csv}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'doterran-subscribers.csv';
    a.click();
  };

  if (loading) {
    return <div className="text-parchment">Loading subscribers...</div>;
  }

  return (
    <div className="min-h-screen bg-navy-blue py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-display text-3xl text-parchment font-semibold">
            Newsletter Subscribers
          </h1>
          <button
            onClick={exportSubscribers}
            className="flex items-center px-4 py-2 bg-forest-green text-parchment rounded-lg hover:bg-forest-green/80 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </button>
        </div>

        <div className="bg-parchment/5 border border-parchment/10 rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 divide-y divide-parchment/10">
            {subscribers.map((subscriber) => (
              <div key={subscriber._id} className="p-6 hover:bg-parchment/5 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-burgundy/20 p-2 rounded-full">
                      <Mail className="h-5 w-5 text-burgundy" />
                    </div>
                    <div>
                      <p className="text-parchment font-medium">{subscriber.email}</p>
                      <div className="flex items-center space-x-2 text-parchment/60 text-sm">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(subscriber.subscribedAt).toLocaleDateString()}</span>
                        <span className={subscriber.isActive ? 'text-forest-green' : 'text-burgundy'}>
                          {subscriber.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {subscribers.length === 0 && (
            <div className="p-8 text-center text-parchment/70">
              <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No subscribers yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Subscribers;