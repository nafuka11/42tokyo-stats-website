import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { fetchContents } from "../../libs/contents";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).send({ error: "Unauthorized" });
    return;
  }
  const contents = fetchContents();
  res.status(200).json(contents);
};

export default handler;
