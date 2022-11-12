import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RemoveTrailingSlash.css';

interface IRemoveTrailingSlashProps {

}

function RemoveTrailingSlash(props: IRemoveTrailingSlashProps): null {

  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (location.pathname.match('/.*/$')) {
      navigate(location.pathname.replace(/\/+$/, ""));
    }
  }, []);

  return null
}

export default RemoveTrailingSlash;