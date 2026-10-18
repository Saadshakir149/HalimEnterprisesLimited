import { serverMessages } from "@/content/forms";
import { confirmedServices } from "@/content/services";
import { handleFormPost } from "@/lib/form-handler";
import { enquiryMails } from "@/lib/form-mail";
import { enquiryRequestSchema } from "@/lib/validation";

const schema = enquiryRequestSchema(confirmedServices.map((service) => service.slug));

/** POST only. Other methods get Next.js's automatic 405. */
export async function POST(request: Request): Promise<Response> {
  return handleFormPost(request, { schema, buildMails: enquiryMails, messages: serverMessages });
}
