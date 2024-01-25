// import { atom } from recoil
import {atom , useRecoilState} from 'recoil'

const getUserState = atom({
    key: 'email',
    default: localStorage.getItem('email') || '',
  });

const useAuth = () => {
  const [emailState, setEmailState] = useRecoilState(getUserState);
  return {emailState, setEmailState}
}

export default useAuth