import { getDoctorData } from "../../../../lib";

export default async function handler(req, res) {
  const { query } = req;
  const { doctorName } = query;
  // console.log(`/api/gp/${query.doctorName}`, req.url, query);

  res.status(200).json(
    await getDoctorData({
      type: "gp",
      field: "doctor",
      value: doctorName,
      isSlug: true,
    })
  );
}
