import Markdown from "markdown-to-jsx";
import PropTypes from "prop-types";
import { useState, useRef } from "react";

import Check2 from "../../assets/svg/check2.svg";
import Close from "../../assets/svg/close-dd.svg";
import Expand from "../../assets/svg/expand-dd.svg";
import Copy from "../../assets/svg/icon-copy.svg";
import * as MDXLayoutStyles from "../../layouts/MDXLayout/styles";
import { GlossaryPropType, QuestionPropType } from "../../types";

const CollapsableSection = function CollapsableSection({ section }) {
  const detailsRef = useRef();
  const [isExpanded, setIsExpanded] = useState();
  const [isCopied, setIsCopied] = useState();

  const sectionCopy = { ...section };

  // in order not to cause error: Hydration failed because the initial UI does not match what was rendered on the server.
  if (sectionCopy.slug === "contractor") {
    sectionCopy.answer = sectionCopy?.answer
      .replaceAll("<ul>", "")
      .replaceAll("</ul>", "")
      .replaceAll("<li>", "-  ")
      .replaceAll("</li>", "");
  }

  const key = `${sectionCopy.position}-${sectionCopy.slug}`;
  const detailsId = `details-${key}`;
  const contentId = `content-${key}`;
  const btnCopyId = `btn-copy-${key}`;
  const btnCheckId = `btn-check-${key}`;
  const btnExpandId = `btn-expand-${key}`;
  const btnCloseId = `btn-close-${key}`;

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  const handleExpand = (e) => {
    e.stopPropagation();
    setIsExpanded(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setIsExpanded(false);
  };

  const handleDetailsClick = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <MDXLayoutStyles.Details
      id={detailsId}
      ref={detailsRef}
      onClick={handleDetailsClick}
    >
      <MDXLayoutStyles.Summary>
        <MDXLayoutStyles.SummaryContentContainer>
          <h3>{sectionCopy.question ?? sectionCopy.term}</h3>
          <MDXLayoutStyles.ButtonsContainer>
            {isCopied ? (
              <MDXLayoutStyles.IconButton id={btnCheckId} disabled>
                <Check2 style={{ path: "green" }} alt="Check" />
              </MDXLayoutStyles.IconButton>
            ) : (
              <MDXLayoutStyles.IconButton id={btnCopyId} onClick={handleCopy}>
                <Copy alt="Copy" />
              </MDXLayoutStyles.IconButton>
            )}
            {isExpanded ? (
              <MDXLayoutStyles.IconButton id={btnCloseId} onClick={handleClose}>
                <Close alt="Close" />
              </MDXLayoutStyles.IconButton>
            ) : (
              <MDXLayoutStyles.IconButton
                id={btnExpandId}
                onClick={handleExpand}
              >
                <Expand alt="Expand" />
              </MDXLayoutStyles.IconButton>
            )}
          </MDXLayoutStyles.ButtonsContainer>
        </MDXLayoutStyles.SummaryContentContainer>
      </MDXLayoutStyles.Summary>
      <Markdown id={contentId}>
        {sectionCopy.answer ?? sectionCopy.definition}
      </Markdown>
    </MDXLayoutStyles.Details>
  );
};

CollapsableSection.propTypes = {
  section: PropTypes.oneOfType([
    PropTypes.shape(QuestionPropType),
    PropTypes.shape(GlossaryPropType),
  ]).isRequired,
};

const Section = function Section({ sectionData }) {
  return sectionData.map((section) => {
    const key = `${section.position}-${section.slug}`;
    return <CollapsableSection key={key} section={section} />;
  });
};

export default Section;

Section.propTypes = {
  sectionData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape(QuestionPropType)),
    PropTypes.arrayOf(PropTypes.shape(GlossaryPropType)),
  ]).isRequired,
};
