import { useRouter } from 'next/router';

import useSWR from 'swr';

import Error from '../../pages/_error';

const DoctorCard = function DoctorCard() {
  const router = useRouter();

  const {
    query: { doctorName },
  } = router;

  const { data, error } = useSWR(() => doctorName && `/api/gp/${doctorName}`);

  if (error) {
    // TODO use some kind of logger for error.status
    return <Error statusCode={500} url={process.env.PUBLIC_URL} />;
  }

  // Zrnić Milko has two entries in case i would need doctor with multiple entries
  return (
    <>
      {data.doctors.map(doctor => (
        <div style={{ padding: '16px' }}>
          <h2>{doctor.name}</h2>
          <p>{doctor.provider}</p>
        </div>
      ))}
    </>
  );
};
export default DoctorCard;
