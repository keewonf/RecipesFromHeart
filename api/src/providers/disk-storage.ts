import fs from "node:fs";
import path from "node:path";

import uploadConfig from "@/configs/upload";

class DiskStorage {
  async ensureTmpFolder() {
    await fs.promises.mkdir(uploadConfig.TMP_FOLDER, { recursive: true });
  }

  async deleteTmpFile(file: string) {
    const filePath = path.resolve(uploadConfig.TMP_FOLDER, file);

    try {
      await fs.promises.access(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export { DiskStorage };
