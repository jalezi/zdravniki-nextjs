import { useRouter } from 'next/router';

import useSWR from 'swr';

import Error from '../../pages/_error';
import Info from './Info';

const DoctorCard = function DoctorCard() {
  const router = useRouter();

  const {
    query: { doctorName, type, instId },
  } = router;

  const { data, error } = useSWR(
    () => doctorName && `/api/v1/${type}/${doctorName}`
  );

  if (error) {
    // TODO use some kind of logger for error.status
    return <Error statusCode={500} />;
  }

  const doctors =
    instId === undefined
      ? data.doctors
      : data.doctors.filter(dr => dr.instId === instId);

  // Zrnić Milko has two entries in case i would need doctor with multiple entries
  return (
    <>
      {doctors.map(doctor => (
        <div
          key={`${doctor.instId}-${doctor.name}`}
          style={{ padding: '16px' }}
        >
          <Info doctor={doctor} />
        </div>
      ))}
    </>
  );
};
export default DoctorCard;
