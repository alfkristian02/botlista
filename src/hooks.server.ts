import type { Handle } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import { ACCESS_KEY } from "$env/static/private";

export const handle: Handle = async ({ event, resolve }) => {
  
  // check if cookie is good
  const cookie = event.cookies.get("access");
  if (cookie === ACCESS_KEY) {
    return resolve(event);
  }
  
  // check if the query param to set cookie is good
  const key = event.url.searchParams.get("key");
  if (key === ACCESS_KEY) {
    event.cookies.set("access", ACCESS_KEY, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax"
    });

    // redirect to main page
    throw redirect(303, "/");
  }
  
  // unauthorized access
  return new Response("Unauthorized", { status: 401 });
};