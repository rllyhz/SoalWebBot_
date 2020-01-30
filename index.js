#!/usr/bin/env node
// Author Rully Ihza Mahendra
// Built for SoalWeb

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

         const namaAdmin = Admin.username
            ? `@${Admin.username}`
            : Admin.firstname + " " + Admin.lastname;

         const namaMember = Member.username
            ? `@${Member.username}`
            : Member.firstname + " " + Member.lastname;

         //  console.log(Admin);
         //  console.log(Member);

         reply.text(`${namaAdmin}, kenapa kamu ngeluarin ${namaMember}?🤔`);
      }

      if (action == "new") {
         const userBaru = msg.members[0];
         const namaUserBaru =
            userBaru.username | (userBaru.firstname + userBaru.lastname);

         reply.text(`Selamat Datang, ${namaUserBaru}!🤗`);
      }
   }
}

bot.all(handler);
bot.edited.all(handler);

// /start
// bot.command("start", "help", (msg, reply) =>
//    reply.text("To schedule an alert, do: /alert <seconds> <text>")
// );

// /halo
bot.command("halo", (msg, reply) => {
   const { user } = msg;
   const namaUser = user.firstname + " " + user.lastname;

   reply.text(`
   Hallo, ${namaUser}🤗 \nAda yang bisa saya bantu?\n
   Silakan ketik \`/list_perintah\` untuk melihat semua perintah.
   `);
});

// /member
bot.command("member", (msg, reply) => {
   reply.text(`
    **|| Member of Soalweb ||**

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
    **|| Website Official SoalWeb ||**

    https://www.soalweb.com/
    `);
});

// /contact
bot.command("contact", (msg, reply) => {
   reply.text(`
     **|| Contact ||**

     Kamu bisa kontak kita kesini 😘🤗
     💌 : soalweb.mail@gmail.com
     📞 : - Vian (+628985929161)
          - Vira (+6285875666255)
     `);
});

bot.command("list_perintah", (msg, reply) => {
   reply.text(`
   **|| Perintah Yang Tersedia ||**

   \`/halo\` => untuk menyapa bot.
   \`/deskripsi\` => untuk melihat deskripsi singkat tentang SoalWeb.
   \`/member\` => untuk melihat daftar member SoalWeb.
   \`/website\` => link website official SoalWeb.
   \`/contact\` => Kontak Kami.
   \`/list_perintah\` => untuk memunculkan menu ini lagi.

   Silakan dicoba deh.. 😍😉
   `);
});

// Helper
function capitalize(s) {
   return s[0].toUpperCase() + s.slice(1);
}
