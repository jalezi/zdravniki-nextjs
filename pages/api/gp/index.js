import { getDoctorData } from "../../../lib";

export default async function handler(req, res) {
  const { query } = req;
  const { field, value, isSlug } = query;

  res.status(200).json(
    await getDoctorData({
      field: field ?? "type",
      value: value ?? "gp",
      isSlug: Boolean(isSlug === "true"),
    })
  );
}
