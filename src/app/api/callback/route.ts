import { serverMessages } from "@/content/forms";
import { handleFormPost } from "@/lib/form-handler";
import { callbackMails } from "@/lib/form-mail";
import { callbackRequestSchema } from "@/lib/validation";

/** POST only. Other methods get Next.js's automatic 405. */
export async function POST(request: Request): Promise<Response> {
  return handleFormPost(request, { schema: callbackRequestSchema, buildMails: callbackMails, messages: serverMessages });
}
