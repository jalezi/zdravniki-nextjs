import Markdown from "markdown-to-jsx";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Tooltip from "rc-tooltip";
import { useEffect, useState, useRef } from "react";

import "rc-tooltip/assets/bootstrap.css";

import Check2 from "../../assets/svg/check2.svg";
import Close from "../../assets/svg/close-dd.svg";
import Expand from "../../assets/svg/expand-dd.svg";
import Copy from "../../assets/svg/icon-copy.svg";
import * as MDXLayoutStyles from "../../layouts/MDXLayout/styles";
import { GlossaryPropType, QuestionPropType } from "../../types";

const Collapsable = function Collapsable({ section }) {
  const router = useRouter();

  const detailsRef = useRef();
  const [isExpanded, setIsExpanded] = useState();
  const [isCopied, setIsCopied] = useState();

  const sectionCopy = { ...section };

  // in order not to cause error: Hydration failed because the initial UI does not match what was rendered on the server.
  sectionCopy.answer = sectionCopy.answer
    ? sectionCopy.answer
        .replaceAll("<li>", "-  ")
        .replaceAll("</li>", "")
        .replace(/<[^>]*>?/gm, "")
    : undefined;
  sectionCopy.definition = sectionCopy.definition
    ? sectionCopy.definition
        .replaceAll("<li>", "-  ")
        .replaceAll("</li>", "")
        .replace(/<[^>]*>?/gm, "")
    : undefined;

  const hash = router.asPath.split("#")[1];
  const detailsId = sectionCopy.slug;
  const btnContainerId = `btn-container-${detailsId}`;

  const shouldOpenAndScrollTo = hash === detailsId;

  useEffect(() => {
    if (shouldOpenAndScrollTo) {
      detailsRef.current.scrollIntoView({
        top: detailsRef.current.getBoundingClientRect().top,
        behavior: "smooth",
      });
      detailsRef.current.open = true;
      setIsExpanded(true);
    }
  }, [shouldOpenAndScrollTo]);

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
    // TODO

    navigator.clipboard.writeText(detailsRef.current.id);
  };

  const handleExpand = (e) => {
    e.stopPropagation();
    setIsExpanded(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setIsExpanded(false);
  };

  const handleDetailsClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isCopied || e.target.id === btnContainerId) {
      return;
    }

    setIsExpanded((prev) => {
      detailsRef.current.open = !prev;
      return !prev;
    });
  };

  return (
    <MDXLayoutStyles.Details id={detailsId} ref={detailsRef}>
      <MDXLayoutStyles.Summary onClick={handleDetailsClick}>
        <MDXLayoutStyles.SummaryContentContainer>
          <h3>{sectionCopy.question ?? sectionCopy.term}</h3>
          <MDXLayoutStyles.ButtonsContainer id={btnContainerId}>
            {isCopied ? (
              <Tooltip placement="top" overlay="Copied!">
                <MDXLayoutStyles.IconButton disabled aria-label="copied">
                  <Check2 alt="Check" />
                </MDXLayoutStyles.IconButton>
              </Tooltip>
            ) : (
              <Tooltip placement="top" overlay="Copy">
                <MDXLayoutStyles.IconButton
                  onClick={handleCopy}
                  aria-label="copy"
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
      </MDXLayoutStyles.Summary>
      <Markdown>{sectionCopy.answer ?? sectionCopy.definition}</Markdown>
    </MDXLayoutStyles.Details>
  );
};

export default Collapsable;

Collapsable.propTypes = {
  section: PropTypes.oneOfType([
    PropTypes.shape(QuestionPropType),
    PropTypes.shape(GlossaryPropType),
  ]).isRequired,
};
