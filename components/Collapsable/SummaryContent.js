import PropTypes from "prop-types";
import Tooltip from "rc-tooltip";

import Check2 from "../../assets/svg/check2.svg";
import Close from "../../assets/svg/close-dd.svg";
import Expand from "../../assets/svg/expand-dd.svg";
import Copy from "../../assets/svg/icon-copy.svg";
import * as MDXLayoutStyles from "../../layouts/MDXLayout/styles";

const SummaryContent = function SummaryContent({
  title,
  isCopied,
  isExpanded,
  handleCopy,
  handleClose,
  handleExpand,
  btnContainerId,
}) {
  return (
    <MDXLayoutStyles.SummaryContentContainer>
      <h3>{title}</h3>
      <MDXLayoutStyles.ButtonsContainer id={btnContainerId}>
        {isCopied ? (
          <Tooltip placement="top" overlay="Copied!">
            <MDXLayoutStyles.IconButton
              disabled
              aria-label="copied"
              className="make-smaller"
            >
              <Check2 alt="Check" />
            </MDXLayoutStyles.IconButton>
          </Tooltip>
        ) : (
          <Tooltip placement="top" overlay="Copy">
            <MDXLayoutStyles.IconButton
              onClick={handleCopy}
              aria-label="copy"
              className="make-smaller"
            >
              <Copy alt="Copy" />
            </MDXLayoutStyles.IconButton>
          </Tooltip>
        )}
        {isExpanded ? (
          <MDXLayoutStyles.IconButton
            onClick={handleClose}
            disabled={isCopied}
            aria-label="close"
          >
            <Close alt="Close" />
          </MDXLayoutStyles.IconButton>
        ) : (
          <MDXLayoutStyles.IconButton
            onClick={handleExpand}
            disabled={isCopied}
            aria-label="expand"
          >
            <Expand alt="Expand" />
          </MDXLayoutStyles.IconButton>
        )}
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
  handleClose: PropTypes.func.isRequired,
  handleExpand: PropTypes.func.isRequired,
  btnContainerId: PropTypes.string.isRequired,
};
