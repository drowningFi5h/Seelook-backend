import { Request, Response } from "express";
import {client} from "../../../utils/typesenseClient";

export default async (req: Request, res: Response) => {
  try {
    const searchResults = await client.collections("products").documents().search({
      q: req.query.q?.toString() || "",
      query_by: "name,description,tags",
      filter_by: "", // Optional filter logic
    });

    return res.status(200).json(searchResults.hits);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
