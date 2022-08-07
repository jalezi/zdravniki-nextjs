/* eslint-disable react/no-unescaped-entities */

import ErrorLayout from '../../../layouts/ErrorLayout';
import { Details, Summary } from '../../../layouts/MDXLayout/styles';

/* eslint-disable react/prop-types */
const sliceErrorStack = (stackTrace = '', numLines = 10) => {
  const lines = stackTrace.split('\n');
  const firstNLines = lines.slice(0, numLines);
  const joinedLines = firstNLines.join('\n');
  return joinedLines;
};

export default function AppErrorFallback({
  error,
  errorInfo,
  resetErrorBoundary,
}) {
  return (
    <ErrorLayout>
      <div>
        <h2>An Error Occurred</h2>
        <p>
          The application detected an error, and it's been reported to the
          application development team. You can try clicking "Reload the Page"
          to return to the page you were on previously.
        </p>
        <p>
          If the error keeps occurring, please file a bug report with the
          following details, and include any steps to reproduce the issue:
        </p>

        <button type="button" onClick={resetErrorBoundary}>
          Reload the Page
        </button>

        <h3>Error Details</h3>
        <h4>Message</h4>
        <pre>{error.message}</pre>
        <Details>
          <Summary>Expand to Show Error Stack Traces</Summary>
          <h4>Stack Trace</h4>
          <pre>{sliceErrorStack(error.stack)}</pre>
          <h4>Component Stack</h4>
          <pre>{sliceErrorStack(errorInfo?.componentStack)}</pre>
        </Details>
      </div>
    </ErrorLayout>
  );
}
