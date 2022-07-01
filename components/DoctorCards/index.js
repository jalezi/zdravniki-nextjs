import { useCallback, useEffect, useRef, useState } from 'react';

import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';

import { DoctorPropType } from '../../types';
import Info from '../DoctorCard/Info';
import * as Styled from './styles';

const getGroupsByLetter = (acc, doctor) => {
  const firstLetter = doctor.name.charAt(0).toUpperCase();
  if (!acc[firstLetter]) {
    acc[firstLetter] = [];
  }
  acc[firstLetter].push(doctor);
  return acc;
};

function useInfiniteScroll({ doctors, pageNum }) {
  const [list, setList] = useState([]);
  const hasMore = doctors.length > list.length;

  useEffect(() => {
    setList(doctors.slice(0, pageNum * 20));
  }, [doctors, pageNum]);

  return { list, hasMore };
}

const DoctorCards = function DoctorCards({ doctors }) {
  const { t: tMap } = useTranslation('map');
  const [pageNum, setPageNum] = useState(1);
  const observer = useRef();

  const { list, hasMore } = useInfiniteScroll({
    doctors,
    pageNum,
  });

  const lastBookElementRef = useCallback(
    // (*)
    node => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNum(prev => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  const groupedByLetter = list.reduce(getGroupsByLetter, {});

  const getVisibleCards = (obj, length) => {
    let elementCount = 0;
    return Object.entries(obj).map(([letter, drGroup]) => {
      const cards = drGroup.map(dr => {
        elementCount += 1;

        return (
          <Info
            key={`${elementCount}-${dr.name}`}
            doctor={dr}
            ref={elementCount === length ? lastBookElementRef : undefined}
          />
        );
      });

      return (
        <section key={letter}>
          <Styled.HeadingBase as="h2">{letter}</Styled.HeadingBase>
          {cards}
        </section>
      );
    });
  };

  const visibleCards = getVisibleCards(groupedByLetter, list.length);

  const count = doctors.length;

  return (
    <>
      <Styled.Header>
        <span>{tMap('totalResults', { count })}</span>
      </Styled.Header>
      <Styled.DoctorsContainer>{visibleCards}</Styled.DoctorsContainer>
    </>
  );
};

DoctorCards.propTypes = {
  doctors: PropTypes.arrayOf(DoctorPropType.isRequired).isRequired,
};

export default DoctorCards;
