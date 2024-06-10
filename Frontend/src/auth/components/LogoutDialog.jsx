import { useDispatch, useSelector } from 'react-redux';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog } from '@headlessui/react';
import { startLogout, toggleOpenLogoutDialog } from '../../store/auth';

export const LogoutDialog = () => {
  const dispatch = useDispatch();
  const { isOpenLogoutDialog } = useSelector((state) => state.auth);

  const handleClose = () => {
    dispatch(toggleOpenLogoutDialog());
  };

  const onLogout = () => {
    dispatch(toggleOpenLogoutDialog());
    dispatch(startLogout());
  };

  const buttonStyle = {
    backgroundColor: '#3B82A6',
    color: 'white',
    padding: '0.5rem 0.75rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    borderRadius: '0.375rem',
    textAlign: 'center',
    cursor: 'pointer',
    border: 'none',
  };

  const buttonHoverStyle = {
    backgroundColor: '#256D8D',
  };

  return (
    <Dialog
      open={isOpenLogoutDialog}
      onClose={handleClose}
      className="fixed z-50 flex w-full sm:w-fit top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <div className="relative xs:w-screen sm:w-[27rem] w-full mx-5">
        {/* <!-- Modal content --> */}
        <div className="relative text-center bg-white rounded-lg shadow dark:bg-gray-800 p-5">
          {/* <!-- Modal header --> */}
          <div className="flex justify-between pb-4 rounded-t mb-5 border-b">
            <div className="text-gray-900 text-xl dark:text-white">
              <h3 className="font-semibold ">Cerrar Sesión</h3>
            </div>
            <div>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={handleClose}
              >
                <XMarkIcon className="w-5 h-5" />
                <span className="sr-only">Close modal</span>
              </button>
            </div>
          </div>
          <p className="pb-4 text-gray-500 dark:text-gray-300">
            ¿Estás seguro que querés cerrar la sesión?
          </p>
          <div className="flex justify-center items-center space-x-4 pt-4 border-t">
            <button
              type="button"
              className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              onClick={handleClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="py-2 px-3 text-sm font-medium text-center text-white bg-blue-400 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-900"
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor;
              }}
              style={{ backgroundColor: buttonStyle.backgroundColor }}
              onClick={onLogout}
            >
              Sí, cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
