import React, { ChangeEvent, useEffect, useState } from 'react';

type PropsType = {
  status: string,
  updateStatus: (status: string) => void
}

const ProfileStatus: React.FC<PropsType> = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status])

  function activateEditMode() {
    setEditMode(true);
  }

  function deactivateEditMode() {
    setEditMode(false);
    props.updateStatus(status);
  }

  function onStatusChange(e: ChangeEvent<HTMLInputElement>) {
    setStatus(e.currentTarget.value);
  }

  return <div>
    {!editMode
      ?
      <div>
        <span onDoubleClick={activateEditMode}>{props.status || '---no status---'}</span>
      </div>
      :
      <div>
        <input autoFocus onBlur={deactivateEditMode} value={status} onChange={onStatusChange}></input>
      </div>
    }
  </div>
}

export default ProfileStatus;