import Markdown from "markdown-to-jsx";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";

import "rc-tooltip/assets/bootstrap.css";

import * as MDXLayoutStyles from "../../layouts/MDXLayout/styles";
import { GlossaryPropType, QuestionPropType } from "../../types";

import SummaryContent from "./SummaryContent";

const repairMarkdown = (text = "") =>
  text
    .replaceAll("<li>", "-  ")
    .replaceAll("</li>", "")
    .replaceAll("<ul>", "")
    .replaceAll("</ul>", "");

const Collapsable = function Collapsable({ section }) {
  const router = useRouter();
  const detailsRef = useRef();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // in order not to cause error: Hydration failed because the initial UI does not match what was rendered on the server.
  const markdown = repairMarkdown(section.answer ?? section.definition);

  const hash = router.asPath.split("#")[1];
  const detailsId = section.slug;
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

  const handleCopy = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
    navigator.clipboard.writeText(id);
  };

  const handleExpand = (e) => {
    e.stopPropagation();
    setIsExpanded(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setIsExpanded(false);
  };

  const handleSummaryClick = (e) => {
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
      <MDXLayoutStyles.Summary onClick={handleSummaryClick}>
        <SummaryContent
          title={section.question ?? section.term}
          btnContainerId={btnContainerId}
          handleClose={handleClose}
          handleCopy={handleCopy}
          handleExpand={handleExpand}
          isCopied={isCopied}
          isExpanded={isExpanded}
        />
      </MDXLayoutStyles.Summary>
      <Markdown>{markdown}</Markdown>
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