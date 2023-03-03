import type { NextApiRequest, NextApiResponse } from "next";

const routesByModelName = {
  "home-page": "/",
  "educational-videos-page": "/educational-videos",
  "advice-page-two": "/advice",
  "be-an-advisor": "/be-an-advisor",
  blog: "/blog",
  "reports-page": "/compliance",
  "contact-us-page": "/contact-us",
  "costs-page": "/costs",
  "exchange-page": "/cambio",
  "fixed-income": "/fixed-income",
  "founder-page": "/founder",
  "investment-fund": "/investment-fund",
  "ipo-page": "/ipo",
  "margem-account": "/margem-account",
  "market-analysis": "/market-analysis",
  "non-resident-investor": "/non-resident-investor",
  "platforms-page": "/platforms",
  portability: "/blog/portability",
  "private-previdencia-page": "/private-pension",
  "recommended-wallet-page": "/recommended-wallet",
  "rlp-page": "/rlp",
  "transfer-of-resource": "/transfer-of-resources",
  "bovespa-page": "/variable-income",
  "what-we-do": "/what-we-do",
  "who-we-are-page": "/who-we-are",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.headers.authorization !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const { model = "", entry } = req.body;
    let modelRoute = "";

    if (model === "blog-post") {
      modelRoute = `/blog/${entry?.slug}`;
    } else {
      modelRoute = routesByModelName[model] || "";
    }

    await res.revalidate(modelRoute);
    return res.json({ revalidated: true });
  } catch (err) {
    console.log(err);

    return res.status(500).send("Error revalidating");
  }
}
