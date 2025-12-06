"use server";

import { PDFParse, type TextResult } from "pdf-parse";

import { db } from "@/lib/db-config";
import { chunkContent } from "@/lib/chunking";
import { generateEmbeddings } from "@/lib/embeddings";
import { documents } from "@/lib/db-schema";

export async function processPdfFile(formData: FormData) {
  try {
    const file = formData.get("pdf") as File;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const parser = new PDFParse({ data: buffer });
    try {
      const result: TextResult = await parser.getText();

      if (!result.text || result.text.trim().length === 0) {
        return {
          success: false,
          error: "No text found in PDF",
        };
      }

      const chunks = await chunkContent(result.text);
      const embeddings = await generateEmbeddings(chunks);

      const records = chunks.map((chunk, index) => ({
        content: chunk,
        embedding: embeddings[index],
      }));

      await db.insert(documents).values(records);

      return {
        success: true,
        message: `Created ${records.length} searchable chunks`,
      };
    } finally {
      await parser.destroy();
    }
  } catch (error) {
    console.error("PDF processing error", error);
    return {
      success: false,
      error: "Failed to process PDF",
    };
  }
}
