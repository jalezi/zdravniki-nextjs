import { useRouter } from "next/router";
import useSWR from "swr";

import Error from "../../pages/_error";

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

  const doctor = data.doctors[0];

  return (
    <div>
      <h2>{doctor?.doctor}</h2>
    </div>
  );
};
export default DoctorCard;
