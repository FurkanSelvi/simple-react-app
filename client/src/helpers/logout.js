
const logoutUser = () => {
  localStorage.removeItem('persist:reactApp:root');
  setTimeout(() => {
    window.location.href = '/login';
  }, 1000);
};

export default logoutUser;
