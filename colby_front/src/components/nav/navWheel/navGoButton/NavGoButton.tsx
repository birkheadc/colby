import * as React from 'react';
import { INavOption } from '../navOption/INavOption';
import './NavGoButton.css'

interface INavGoButtonProps {
  selection: INavOption,
  navigate(): void,
}

function NavGoButton(props: INavGoButtonProps): JSX.Element {
  return (
    <div className='nav-go-button-wrapper'>
      <button onClick={props.navigate}>{props.selection.title}</button>
    </div>
  );
}

export default NavGoButton;