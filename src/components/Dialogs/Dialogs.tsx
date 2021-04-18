import React, { ChangeEvent } from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { DialogsPageStateType, sendMessageCreator } from "../../redux/dialogs-reducer";
import { connect } from 'react-redux';
import { StateType } from '../../redux/redux-store';
import { compose, Dispatch } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { Field, InjectedFormProps, reduxForm } from "redux-form";

type DialogsType = {
  dialogsPage: DialogsPageStateType
  sendMessage: (message: string) => void,
}

const Dialogs = (props: DialogsType) => {
  let state = props.dialogsPage;

  let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id} />);
  let messagesElements = state.messages.map(m => <Message message={m.message} />);

  function handleSubmit(formData: { message?: string}) {
    if (formData.message) {
      props.sendMessage(formData.message);
    }
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {dialogsElements}
      </div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
        <AddMessageFormRedux onSubmit={handleSubmit}/>
      </div>
    </div>
  )
};

type AddMessageFormPropsType = InjectedFormProps;

function AddMessageForm(props: AddMessageFormPropsType) {
  return <form onSubmit={props.handleSubmit}>
    <div>
      <Field placeholder={'Enter your message'} component={"textarea"} name="message"/>
    </div>
    <div>
      <button>add message</button>
    </div>
  </form>
}

const AddMessageFormRedux = reduxForm({ form: 'dialogs' })(AddMessageForm);

function mapStateToProps(state: StateType) {
  return {
    dialogsPage: state.dialogsPage
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    sendMessage: (message: string) => {
      dispatch(sendMessageCreator(message));
    }
  }
}

export default compose<React.ComponentType>(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);