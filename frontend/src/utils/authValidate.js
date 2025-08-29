export function emailValidate(email) {
  if (!email || email.trim() === '') return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}


export function passwordValidate(password) {
  if (!password || password.trim() === '') return false;
  return password.length >= 6 && password.length <= 20;
}

export function userNameValidate(user_name) {
  if (!user_name || user_name.trim() === '') return false;

  const regex = /^[A-Za-z0-9_]{3,}$/;
  return regex.test(user_name.trim());
}