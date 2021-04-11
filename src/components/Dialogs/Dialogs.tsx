import React, { ChangeEvent } from 'react';
import {NavLink} from 'react-router-dom';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {StoreType} from "../../redux/redux-store";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";

type DialogsType = {
    store: StoreType
}

const Dialogs = (props: DialogsType) => {
    let state = props.store.getState().dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>);
    let messagesElements = state.messages.map(m => <Message message={m.message}/>);
    let newMessageBody = state.newMessageBody;

    let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.target.value;
        props.store.dispatch(updateNewMessageBodyCreator(body));
    }

    function onSendMessageClick() {
        props.store.dispatch(sendMessageCreator());
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

export default Dialogs;