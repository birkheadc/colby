import * as React from 'react';
import IApiResult from '../../../api/IApiResponse';
import './FormMessage.css';

interface IFormMessageProps {
  result: IApiResult
}
function FormMessage(props: IFormMessageProps): JSX.Element {
  return (
    <span className={props.result.errorCode === 0 ? 'form-message success' : 'form-message error'}>{props.result.message}</span>
  );
}

export default FormMessage;