import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { ErrorBoundary } from 'react-error-boundary';

const FallbackComponent = function FallbackComponent() {
  const { t } = useTranslation('common');
  return <div>{t('error.title')}</div>;
};

/**
 * Error boundary component for unhandled errors
 * @example
 * <ErrorBoundaryWrapper><App /></ErrorBoundaryWrapper>
 */
const ErrorBoundaryWrapper = function ErrorBoundaryWrapper({ children }) {
  return (
    <ErrorBoundary fallbackRender={FallbackComponent}>{children}</ErrorBoundary>
  );
};

ErrorBoundaryWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

/**
 * Error boundary higher-order component for unhandled errors
 * @example
 * export default withErrorBoundary(App)
 */
export const withErrorBoundary = WrappedComponent =>
  function renderComponent({ ...props }) {
    return (
      <ErrorBoundaryWrapper>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <WrappedComponent {...props} />
      </ErrorBoundaryWrapper>
    );
  };

export default ErrorBoundaryWrapper;
