// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { withErrorHandler } from "@/middleware/withErrorHandler";

type Data = {
  name: string;
};

function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (Math.random() < 0.5) {
    throw new Error("coolio");
  }

  res.status(200).json({ name: "John Doe" });
}

export default withErrorHandler(handler);
