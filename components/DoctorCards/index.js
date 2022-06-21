import Link from "next/link";
import PropTypes from "prop-types";

import { toSlug } from "../../lib";
import { DoctorPropType } from "../../types";

const DoctorCards = function DoctorCards({ doctors }) {
  const drJsx = (dr) => (
    <div key={dr.doctor + dr.id_inst}>
      <br />
      {Object.entries(dr).map(([key, value]) => {
        if (key === "doctor") {
          return (
            <p key={`${value}${key}S`}>
              <span>{key}: </span>
              <Link href={`/gp/${toSlug(value)}`} key={`${value}${key}L`}>
                {value}
              </Link>
            </p>
          );
        }
        return (
          <p key={`${value}${key}M`}>
            {key}: {value}
          </p>
        );
      })}
      <br />
    </div>
  );
  return <div>{doctors.map(drJsx)}</div>;
};

DoctorCards.propTypes = {
  doctors: PropTypes.arrayOf(DoctorPropType.isRequired).isRequired,
};

export default DoctorCards;
