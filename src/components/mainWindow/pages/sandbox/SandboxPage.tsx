import * as React from 'react';
import ErrorDisplay from '../../../errorDisplay/ErrorDisplay';
import './SandboxPage.css'

interface ISandboxPageProps {

}

function SandboxPage(props: ISandboxPageProps): JSX.Element {
  return (
    <ErrorDisplay message={"This page isn't ready yet"} />
  );
}

export default SandboxPage;