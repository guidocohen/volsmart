// Son funciones intermedias entre la request y el almacenamiento en el estado.

export const logger = (store) => (next) => (action) => {
  next(action);
};

export const featuring = (store) => (next) => (actionInfo) => {
  const featured = [{ name: "eddie" }, ...actionInfo.action.payload];
  const updatedActionInfo = {
    ...actionInfo,
    action: { ...actionInfo.action, payload: featured },
  };
  next(updatedActionInfo);
};
