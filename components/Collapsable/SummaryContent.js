import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';

import * as MDXLayoutStyles from '../../layouts/MDXLayout/styles';
import {
  Check2Icon,
  CloseCircleIcon,
  CopyIcon,
  ExpandIcon,
} from '../Shared/Icons';

const SummaryContent = function SummaryContent({
  title,
  isCopied,
  isExpanded,
  handleCopy,
  btnContainerId,
}) {
  return (
    <MDXLayoutStyles.SummaryContentContainer>
      <h3>{title}</h3>
      <MDXLayoutStyles.ButtonsContainer id={btnContainerId}>
        <Tooltip
          placement="top"
          overlay={isCopied ? 'Link copied!' : 'Copy link'}
        >
          <MDXLayoutStyles.IconButton
            onClick={isCopied ? () => {} : handleCopy}
            aria-label={isCopied ? 'link copied' : 'copy link'}
            className="copy"
          >
            {isCopied ? <Check2Icon alt="Check" /> : <CopyIcon alt="Copy" />}
          </MDXLayoutStyles.IconButton>
        </Tooltip>
        <MDXLayoutStyles.IconButton
          disabled={isCopied}
          aria-label={isExpanded ? 'close' : 'expand'}
        >
          {isExpanded ? (
            <CloseCircleIcon alt="Close" />
          ) : (
            <ExpandIcon alt="Expand" />
          )}
        </MDXLayoutStyles.IconButton>
      </MDXLayoutStyles.ButtonsContainer>
    </MDXLayoutStyles.SummaryContentContainer>
  );
};

export default SummaryContent;

SummaryContent.propTypes = {
  title: PropTypes.string.isRequired,
  isCopied: PropTypes.bool.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  handleCopy: PropTypes.func.isRequired,
  btnContainerId: PropTypes.string.isRequired,
};
