const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {})
    },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request gagal' }));
    throw new Error(error.message || 'Request gagal');
  }

  return response.json();
}

export const api = {
  getBackup: (token) => request('/backup', { token }),
  saveBackup: (token, body) => request('/backup', { method: 'POST', token, body }),
  exportBackup: (token) => request('/backup/export', { token })
};
