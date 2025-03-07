import { NextApiResponse } from "next";
import { helius } from "../HeliusConfig";

export async function GET(req: Request, res: NextApiResponse) {
  const result = await helius.rpc.searchAssets({
    tokenType: "all",
    // limit: 2,
    // burnt: false,
    page: 1,
    compressed: true,
  });
  console.log("result ", result);

  return Response.json(result);
}
