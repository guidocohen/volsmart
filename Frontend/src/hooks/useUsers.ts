import { useDispatch, useSelector } from 'react-redux';
import { setUserToShow, toggleUserDetail } from '../store/users/slice';
import { RootState } from '../store/reducers/types';

export const useUsers = () => {
  const dispatch = useDispatch();
  const { isUserDetailOpen } = useSelector((state: RootState) => state.users);

  const showUserDetail = (userDetail) => {
    dispatch(setUserToShow(userDetail));
    !isUserDetailOpen && dispatch(toggleUserDetail());
  };

  return {
    showUserDetail,
  };
};
