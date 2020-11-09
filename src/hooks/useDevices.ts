import { useEffect, useState } from 'react';
import getDevices, { DeviceInfo } from '../utils/getDevices';

export default function useDevices() {
  const [devices, setDevices] = useState<DeviceInfo>({
    audios: [],
    videos: [],
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getDevices()
      .then(result => setDevices(result))
      .catch(e => setError(e))
      .finally(() => setLoading(false));
  }, []);
  return { devices, error, loading };
}