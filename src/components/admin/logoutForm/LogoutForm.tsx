import * as React from 'react';
import './LogoutForm.css'

interface ILogoutFormProps {
  handleLogout: Function
}

function LogoutForm(props: ILogoutFormProps): JSX.Element {

  const logout = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    props.handleLogout();
  }

  return (
    <form onSubmit={logout}>
      <button type='submit'>Logout</button>
    </form>
  );
}

export default LogoutForm;