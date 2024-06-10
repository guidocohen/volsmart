import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { clearErrorMessage, isFirstInitFalse } from '../../store/auth';
import { ArrowRightEndOnRectangleIcon, UserPlusIcon } from '@heroicons/react/24/outline';

export const AuthLayout = ({ children }) => {
  const path = useLocation().pathname;
  const dispatch = useDispatch();

  const handleTabChange = (_, value) => {
    dispatch(clearErrorMessage());
    if (value) dispatch(isFirstInitFalse());
    sessionStorage.setItem('processingSignOn', false);
  };

  return (
    <div className="flex items-center justify-center bg-primary-main py-20">
      <div className="shadow-md rounded-lg w-11/12 md:w-5/12 opacity-90 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white">
        <div className="flex flex-row items-center">
          <Link
            to="/auth/login"
            className={`${
              path.includes('login')
                ? 'border-b border-gray-900 dark:border-gray-200 text-black-800 text-lg font-semibold'
                : 'font-medium text-gray-600'
            } flex flex-row justify-center items-center w-full h-14 mb-5 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white`}
            onClick={handleTabChange}
          >
            <div className="pr-2">
              <ArrowRightEndOnRectangleIcon className="h-6 w-6 text-black dark:text-white" />
            </div>
            <span className="whitespace-nowrap truncate">Iniciar Sesión</span>
          </Link>
          <Link
            to="/auth/register"
            className={`${
              path.includes('register')
                ? 'border-b border-gray-900 dark:border-gray-200 text-black-800 text-lg font-semibold'
                : 'font-medium text-gray-600'
            } flex flex-row justify-center items-center w-full h-14 mb-5 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white`}
            onClick={handleTabChange}
          >
            <div className="pr-2">
              <UserPlusIcon className="h-6 w-6 text-black dark:text-white" />
            </div>
            <span>Registrarme</span>
          </Link>
        </div>
        <div className="mx-8 mb-8">
          <div className="flex justify-center items-center mb-10">
            <h1 className={`text-3xl font-bold ml-2`}>Volsmart</h1>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
