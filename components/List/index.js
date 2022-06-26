import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";

import { DoctorPropType } from "../../types";

import * as Styled from "./styles";

const List = function List({ doctorGroups }) {
  const { t: tMap } = useTranslation("map");

  const count = Object.values(doctorGroups).reduce(
    (acc, group) => acc + group.length,
    0
  );

  return (
    <>
      <Styled.Header>
        <span>{tMap("totalResults", { count })}</span>
      </Styled.Header>
      <Styled.DoctorsContainer>
        {Object.entries(doctorGroups).map(([letter, drGroup]) => (
          <section key={letter}>
            <Styled.HeadingBase as="h2">{letter}</Styled.HeadingBase>
            <ul>
              {drGroup.map((dr) => (
                <li key={dr.id_inst + dr.slug}>
                  <a href={`/gp/${dr.slug}`}>{dr.doctor}</a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </Styled.DoctorsContainer>
    </>
  );
};

export default List;

List.propTypes = {
  doctorGroups: PropTypes.shape({
    A: PropTypes.arrayOf(DoctorPropType.isRequired),
  }).isRequired,
};
