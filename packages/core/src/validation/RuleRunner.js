export const ruleRunner = (name, nameText, ...validations) => {
  return state => {
    for (let v of validations) {
      let errorMessageFunc = v(state[name], state);
      if (errorMessageFunc) {
        return { [name]: errorMessageFunc(nameText) };
      }
    }
    return null;
  };
};

export const run = (state, runners) => {
  return runners.reduce((memo, runner) => {
    return Object.assign(memo, runner(state));
  }, {});
};
