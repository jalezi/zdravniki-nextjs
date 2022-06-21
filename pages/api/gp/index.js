import { getDoctorData } from "../../../lib";

export default async function handler(req, res) {
  const { url } = req;
  // console.log("/api/gp", url,);

  const type = url.split("/")[2];
  res.status(200).json(
    await getDoctorData({
      type,
      field: "",
      value: "",
      isSlug: false,
    })
  );
}
