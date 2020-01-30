#!/usr/bin/env node
// Author Rully Ihza Mahendra

const Botgram = require("botgram");
const Figlet = require("figlet");
const dotenv = require("dotenv");

dotenv.config();
const { API_TOKEN } = process.env;

if (!API_TOKEN) {
   console.error(
      "Please provide your Telegram Bot Token. I can not proceed..."
   );
   process.exit(1);
}

const bot = new Botgram(API_TOKEN);

bot.ready(() => {
   console.log("Bot running...");
});

function handler(msg, reply, next) {
   if (msg) {
      const { action } = msg;
      //  action => @string 'leave' : 'new'

      if (action == "leave") {
         const Admin = msg.from;
         const Member = msg.member;

         const namaAdmin = Admin.username | Admin.firstname;
         const namaMember =
            Member.username | (Member.firstname + Member.lastname);

         console.log(Admin);
         console.log(Member);

         reply.text(
            `${capitalize(namaAdmin)}, kenapa kamu ngeluarin ${capitalize(
               namaMember
            )}?🤔`
         );
      }

      if (action == "new") {
         const userBaru = msg.members[0];
         const namaUserBaru =
            userBaru.username | (userBaru.firstname + userBaru.lastname);

         reply.text(`Selamat Datang, ${capitalize(namaUserBaru)}!🤗`);
      }
   }
}

bot.all(handler);
bot.edited.all(handler);

// /start
bot.command("start", "help", (msg, reply) =>
   reply.text("To schedule an alert, do: /alert <seconds> <text>")
);

// /halo
bot.command("halo", (msg, reply) => {
   reply.text(`
   Hallo, ${msg.user.name}🤗 \nAda yang bisa saya bantu?

   
   `);
});

// /member
bot.command("member", (msg, reply) => {
   reply.text(`
    || Member of Soalweb ||

    1. @Novianpmb
    2. @Tonul
    3. @rllyhz atau @rllyhz_2
    5. @afandimsr
    6. Vira Oktaviani
    `);
});

// /website
bot.command("member", (msg, reply) => {
   reply.text(`
    || Website Official SoalWeb ||

    https://www.soalweb.com/
    `);
});

// /contact
bot.command("contact", (msg, reply) => {
   reply.text(`
     || Contact ||

     Kamu bisa kontak kita kesini 😘🤗
     💌 : soalweb.mail@gmail.com
     📞 : - Vian (+628985929161)
          - Vira (+6285875666255)
     `);
});

// Helper
function capitalize(s) {
   return s[0].toUpperCase() + s.slice(1);
}
