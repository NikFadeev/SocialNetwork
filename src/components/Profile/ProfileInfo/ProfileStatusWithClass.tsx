import React, { ChangeEvent } from 'react';

type PropsType = {
  status: string,
  updateStatus: (status: string) => void
}

class ProfileStatus extends React.Component<PropsType> {
  state = {
    editMode: false,
    status: this.props.status
  }

  activateEditMode() {
    this.setState({
      editMode: true
    })
  }

  deactivateEditMode = () => {
    this.setState({
      editMode: false
    });
    this.props.updateStatus(this.state.status);
  }

  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.currentTarget.value
    })
  }

  componentDidUpdate(prevProps: PropsType, prevState: any) {
    if (this.props.status !== prevProps.status) {
      this.setState({
        status: this.props.status
      });
    }
  }

  render() {
    return <div>
      {!this.state.editMode
        ?
        <div>
          <span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status}</span>
        </div>
        :
        <div>
          <input autoFocus onBlur={this.deactivateEditMode} value={this.state.status} onChange={this.onStatusChange}></input>
        </div>
      }
    </div>
  }
}

export default ProfileStatus;