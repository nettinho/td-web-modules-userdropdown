import _ from "lodash/fp";
import * as ErrorMessages from "./ErrorMessages.js";

export const required = text => {
  if (_.isEmpty(text)) {
    return ErrorMessages.isRequired;
  } else {
    return null;
  }
};

export const mustMatch = (name, nameText) => {
  return (text, state) => {
    return state[name] === text ? null : ErrorMessages.mustMatch(nameText);
  };
};

export const minLength = length => {
  return text => {
    return text.length >= length ? null : ErrorMessages.minLength(length);
  };
};

export const validEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email)) {
    return null;
  } else {
    return ErrorMessages.invalidFormat("my@email.com");
  }
};

export const validUrls = urls => {
  if (!_.isUndefined(urls)) {
    for (let url of urls) {
      if (_.isEmpty(url.url_name) || _.isEmpty(url.url_value)) {
        return ErrorMessages.isRequired;
      }
    }
  }
  return null;
};
