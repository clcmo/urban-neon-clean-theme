import type { ThemeArtifact } from "./ThemeModels.ts";

export interface ThemeWriter {
  write(artifact: ThemeArtifact): Promise<void>;
}