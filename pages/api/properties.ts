import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { parseStringPromise } from "xml2js";

const PROPERTY_FEED_URL = "https://expert.propertyfinder.ae/feed/signature-spaces-real-estate-l-l-c/genericportal/b2681cd2fb8d80eb4f27e28a4bdd51ee";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Fetch XML data from Property Finder
    const { data } = await axios.get(PROPERTY_FEED_URL, {
      headers: { "Content-Type": "application/xml" },
    });

 

    // Parse XML to JSON
    const jsonData = await parseStringPromise(data, {
      explicitArray: false, // Prevents wrapping everything in arrays
      mergeAttrs: true, // Moves attributes to the main object
    });

   

    // Extract properties list from XML response
    const properties = jsonData.list?.property || [];

    // Return parsed data
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Failed to fetch properties" });
  }
}
