const Botgram = require("botgram");
const Figlet = require("figlet");

const { API_TOKEN } = process.env;

if (!API_TOKEN) {
   console.error(
      "Please provide your Telegram Bot Token. I can not proceed..."
   );
   process.exit(1);
}

const bot = new Botgram(API_TOKEN);

function onMessage(msg, reply) {
   Figlet(msg.text, (error, data) => {
      if (error) {
         reply
            .text("An error occured. Probably text format is not correct.")
            .then();
         return;
      }

      const markdownResult = `${"```\n"}${data}${"\n```"}`;
      reply.markdown(markdownResult).then();
      console.log(markdownResult);
   });
}

bot.text(onMessage);
