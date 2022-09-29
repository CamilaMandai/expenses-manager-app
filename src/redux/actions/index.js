// Coloque aqui suas actions
export const SAVE_PASSWORD = 'SAVE_PASSWORD';
export const SAVE_EMAIL = 'SAVE_EMAIL';

export const saveEmailAction = (email) => ({
  type: SAVE_EMAIL,
  payload: email,
});

export const savePasswordAction = (password) => ({
  type: SAVE_PASSWORD,
  payload: password,
});
