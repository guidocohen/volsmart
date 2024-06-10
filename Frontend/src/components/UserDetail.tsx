import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Dialog } from '@headlessui/react';
import { toggleUserDetail } from '../store/users/slice';
import { DetailField } from './DetailField';
import { RootState } from '../store/reducers/types';

export const UserDetail = () => {
  const dispatch = useDispatch();
  const { userToShow, isUserDetailOpen } = useSelector((state: RootState) => state.users);

  return (
    <Dialog
      open={isUserDetailOpen}
      onClose={() => dispatch(toggleUserDetail())}
      className="fixed z-50 inset-0 flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden max-w-4xl w-full mx-4 md:mx-0">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
            {userToShow?.user_name
              ? userToShow?.user_name?.charAt(0).toUpperCase() +
                userToShow?.user_name?.slice(1)
              : '-'}
          </h3>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
            onClick={() => dispatch(toggleUserDetail())}
          >
            <XMarkIcon className="w-5 h-5" />
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:space-x-6">
            <div className="md:w-1/2">
              <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                Information Personal
              </h4>
              <div className="space-y-2 mt-2">
                <DetailField title={'Cumpleaños'} data={userToShow?.fec_birthday} />
                <DetailField title={'Color Favorito'} data={userToShow?.color_favorito} />
                <DetailField
                  title={'Cantidad de Compras Realizadas'}
                  data={userToShow?.cantidad_compras_realizadas}
                />
                <DetailField title={'IP'} data={'******'} />
              </div>
              <div className="mt-6">
                <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  Ubicación
                </h4>
                <div className="space-y-2 mt-2">
                  <DetailField title={'Dirección'} data={userToShow?.direccion} />
                  <DetailField title={'Código Postal'} data={userToShow?.codigo_zip} />
                  <DetailField title={'Latitud'} data={userToShow?.geo_latitud} />
                  <DetailField title={'Longitud'} data={userToShow?.geo_longitud} />
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                Vehículo
              </h4>
              <div className="space-y-2 mt-2">
                <DetailField title={'Auto'} data={userToShow?.auto} />
                <DetailField title={'Modelo'} data={userToShow?.auto_modelo} />
                <DetailField title={'Tipo'} data={userToShow?.auto_tipo} />
                <DetailField title={'Color'} data={userToShow?.auto_color} />
              </div>
              <div className="mt-6">
                <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  Tarjeta de Crédito
                </h4>
                <div className="space-y-2 mt-2">
                  <DetailField
                    title={'Número de Cuenta'}
                    data={userToShow?.cuenta_numero}
                  />
                  <DetailField
                    title={'Número de Tarjeta'}
                    data={userToShow?.credit_card_num}
                  />
                  <DetailField title={'CCV'} data={userToShow?.credit_card_ccv} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
