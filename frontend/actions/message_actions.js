import * as MessageAPIUtil from '../util/message_api_util';

export const RECEIVE_NEW_MESSAGE = "RECEIVE_NEW_MESSAGE";
export const RECEIVE_OLD_MESSAGE = "RECEIVE_OLD_MESSAGE";
export const REMOVE_MESSAGE = "REMOVE_MESSAGE";
export const RECEIVE_MESSAGE_ERRORS = "RECEIVE_MESSAGE_ERRORS";

export const receiveNewMessage = message => ({
  message,
  type: RECEIVE_NEW_MESSAGE
});

export const receiveOldMessage = message => ({
  message,
  type: RECEIVE_OLD_MESSAGE
});

export const removeMessage = id => ({
  id,
  type: REMOVE_MESSAGE
});

export const receiveMessageErrors = errors => ({
  errors,
  type: RECEIVE_MESSAGE_ERRORS
});

export const createMessage = channelId => message => dispatch => {
  return MessageAPIUtil.createMessage(channelId)(message)
    .then(retMessage => dispatch(receiveNewMessage(retMessage)))
    .fail(err => dispatch(receiveMessageErrors(err.responseJSON)));
};

export const updateMessage = message => dispatch => {
  return MessageAPIUtil.updateMessage(message)
    .then(retMessage => dispatch(receiveOldMessage(retMessage)))
    .fail(err => dispatch(receiveMessageErrors(err.responseJSON)));
};

export const deleteMessage = id => dispatch => {
  return MessageAPIUtil.deleteMessage(id)
    .then(() => dispatch(removeMessage(id)));
};
