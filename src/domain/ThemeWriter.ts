import { ThemeArtifact } from "./ThemeModels.js";

export interface ThemeWriter {
  write(artifact: ThemeArtifact): Promise<void>;
}