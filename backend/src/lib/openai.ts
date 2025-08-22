import { env } from './../config/env';
import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: env.openaiKey,
});
