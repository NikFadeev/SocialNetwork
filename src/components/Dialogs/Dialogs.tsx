import React, { ChangeEvent } from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { DialogsPageStateType, sendMessageCreator, updateNewMessageBodyCreator } from "../../redux/dialogs-reducer";
import { connect } from 'react-redux';
import { StateType } from '../../redux/redux-store';
import { Dispatch } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

type DialogsType = {
  dialogsPage: DialogsPageStateType
  sendMessage: () => void,
  updateNewMessageBody: (body: string) => void
}

const Dialogs = (props: DialogsType) => {
  let state = props.dialogsPage;

  let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id} />);
  let messagesElements = state.messages.map(m => <Message message={m.message} />);
  let newMessageBody = state.newMessageBody;

  let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let body = e.target.value;
    // props.store.dispatch(updateNewMessageBodyCreator(body));
    props.updateNewMessageBody(body);
  }

  function onSendMessageClick() {
    // props.store.dispatch(sendMessageCreator());
    props.sendMessage();
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {dialogsElements}
      </div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
        <div>
          <div><textarea value={newMessageBody}
            onChange={onNewMessageChange}
            placeholder={'Enter your message'}></textarea></div>
          <div>
            <button onClick={onSendMessageClick}>add message</button>
          </div>
        </div>
      </div>
    </div>
  )
};

function mapStateToProps(state: StateType) {
  return {
    dialogsPage: state.dialogsPage
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    sendMessage: () => {
      dispatch(sendMessageCreator());
    },
    updateNewMessageBody: (body: string) => {
      dispatch(updateNewMessageBodyCreator(body));
    }
  }
}

const withRedirect = withAuthRedirect(Dialogs);

export default connect(mapStateToProps, mapDispatchToProps)(withRedirect);