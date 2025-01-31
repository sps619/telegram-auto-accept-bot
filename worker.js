/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch(request) {
    const token = "YOUR_BOT_TOKEN"; // Replace with your bot token
    const url = `https://api.telegram.org/bot${token}`;
    //const secret = "23a5a7c184e8f54686f71783fbeed4b5"; // A secret to validate updates
    
    // // Validate secret token
    // const receivedSecret = request.headers.get("secret_token");
    // if (receivedSecret !== secret) {
    //   return new Response("Unauthorized", { status: 401 });
    // }


    if (request.method === "POST") {
      const update = await request.json();

      // Validate if the request contains a join request
      if (update.chat_join_request) {
        const { chat, from } = update.chat_join_request;

        // Approve the join request
        const response = await fetch(`${url}/approveChatJoinRequest`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chat.id,
            user_id: from.id,
          }),
        });

        return new Response(await response.text(), {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    return new Response("Invalid request", { status: 400 });
  },
};
