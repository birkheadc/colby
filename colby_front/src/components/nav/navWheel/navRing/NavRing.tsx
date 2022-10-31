import * as React from 'react';
import { INavOption } from '../navOption/INavOption';
import './NavRing.css'

interface INavRingProps {
  select(selection: INavOption): void
}

function NavRing(props: INavRingProps): JSX.Element {
  return (
    <div>
      
    </div>
  );
}

export default NavRing;