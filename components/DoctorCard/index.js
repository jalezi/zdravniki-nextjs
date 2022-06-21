import { useRouter } from "next/router";
import useSWR from "swr";

const DoctorCard = function DoctorCard() {
  const router = useRouter();

  const {
    query: { doctorName },
  } = router;

  const { data } = useSWR(() => doctorName && `/api/gp/${doctorName}`);

  const doctor = data.doctors[0];

  return (
    <div>
      <h2>{doctor?.doctor}</h2>
    </div>
  );
};
export default DoctorCard;
