import { useEffect } from 'react';

import { compiler } from 'markdown-to-jsx';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';

import { GlossaryPropType, QuestionPropType } from '../../types';
import Section from '../Section';

const convertDataDefinition = definition => {
  if (definition?.props?.children) {
    return definition.props.children.map(child => convertDataDefinition(child));
  }

  return definition;
};

const Sections = function Sections({ data }) {
  const { t: tFaq } = useTranslation('faq');

  useEffect(() => {
    document.querySelectorAll('main a').forEach(el => {
      if (/^(https?:)?\/\//.test(el.getAttribute('href'))) {
        el.setAttribute('target', '_blank');
      }
    });
  }, []);

  useEffect(() => {
    document.querySelectorAll('span[data-term]').forEach(el => {
      // eslint-disable-next-line no-restricted-syntax
      for (const term of data.glossary) {
        if (term.slug === el.getAttribute('data-term')) {
          el.setAttribute(
            'data-definition',
            compiler(term.definition)
              .props.children.map(child => convertDataDefinition(child))
              .flat(Infinity)
              .join('')
          );
          el.setAttribute('tabindex', 0);
        }
      }
    });
  }, [data.glossary]);

  const headings = tFaq('headings', { returnObjects: true });
  return (
    <>
      <Section sectionData={data.faq} title={headings.general} />
      <Section sectionData={data.glossary} title={headings.glossary} />
    </>
  );
};

Sections.propTypes = {
  data: PropTypes.shape({
    faq: PropTypes.arrayOf(PropTypes.shape(QuestionPropType)),
    glossary: PropTypes.arrayOf(PropTypes.shape(GlossaryPropType)),
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    resource_uri: PropTypes.string.isRequired,
  }).isRequired,
};

export default Sections;
