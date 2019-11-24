export function selectPrivateUser(state) {
  console.log(state.user);
  return state.user && state.user.token && !state.user.email_verified;
}
export function selectPrivateVerifiedUser(state) {
  return state.user && state.user.token && state.user.email_verified;
}
export function selectUser(state) {
  return state.user;
}
