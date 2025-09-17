import express, { Application, Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import { createWorker } from "tesseract.js";
import path from "path";
import { log } from "console";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/bmp",
      "image/webp",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only image files are allowed."));
    }
  },
});

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

app.post(
  "/api/ocr",
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image file provided" });
      }

      const worker = await createWorker("eng", 1, {
        corePath:
          "https://unpkg.com/tesseract.js-core@6.0.0/tesseract-core-simd.wasm.js",
      });

      const {
        data: { text },
      } = await worker.recognize(req.file.buffer);

      await worker.terminate();

      res.json({
        text: text.trim(),
        filename: req.file.originalname,
        size: req.file.size,
      });
    } catch (error) {
      console.error("OCR Error:", error);
      res.status(500).json({
        error: "Failed to process image",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
);

app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.use(
  (
    error: Error | multer.MulterError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ error: "File too large. Maximum size is 10MB." });
      }
    }

    if (error.message === "Invalid file type. Only image files are allowed.") {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal server error" });
  }
);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
