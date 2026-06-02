//=b Logger middleware minimale: sostituisce `redux-logger` (non mantenuto,
//=b tirava dentro il deprecato `deep-diff`). Attivo solo in sviluppo.
const logger = (store) => (next) => (action) => {
  if (!import.meta.env.DEV) return next(action);

  const prevState = store.getState();
  const result = next(action);
  const nextState = store.getState();

  console.groupCollapsed(
    `%caction %c${action.type}`,
    "color: gray; font-weight: lighter;",
    "color: inherit; font-weight: bold;"
  );
  console.log("%cprev state", "color: #9E9E9E; font-weight: bold;", prevState);
  console.log("%caction    ", "color: #03A9F4; font-weight: bold;", action);
  console.log("%cnext state", "color: #4CAF50; font-weight: bold;", nextState);
  console.groupEnd();

  return result;
};

export default logger;
