import Cookies from 'universal-cookie';
const cookies = new Cookies();
export const auth = () => {
  // const accessToken = Cookies.get('access-token');
  // const refreshToken = Cookies.get('refresh-token');
  const accessToken = cookies.get('access-token');
  console.log(document.cookie);
  // console.log(refreshToken);
};
