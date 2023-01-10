import * as React from 'react';
import './LoginForm.css'

interface ILoginFormProps {
  handleLogin: (password: string) => void
}

function LoginForm(props: ILoginFormProps): JSX.Element {

  const [input, setInput] = React.useState<string>('');

  const login = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    props.handleLogin(input);
  }

  const updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  }

  return (
    <form onSubmit={login}>
      <h2>Log In</h2>
      <input onChange={updateInput} type='password' value={input}></input>
    </form>
  );
}

export default LoginForm;