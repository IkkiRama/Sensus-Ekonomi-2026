export const LOCAL_DATA_KEY = 'se2026_local_data';
export const SERVER_EMPTY_KEY_PREFIX = 'se2026_server_empty_';

export function hasAnyStoredData(data) {
  return Boolean(data?.desa?.length || data?.rt?.length || data?.keluarga?.length);
}

export function serverEmptyKey(uid) {
  return `${SERVER_EMPTY_KEY_PREFIX}${uid}`;
}
