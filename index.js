const { Telegraf } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply("Welcome"));

bot.hears("hi", (ctx) => ctx.reply("Hey there"));

bot.command("abcd", (ctx) => {
  ctx.sendInvoice({
    currency: "usd",
    chat_id: ctx.chat.id,
    title: "Buy ABCD tokens",
    description:
      "ABCD tokens are the true value of USA presidential elections. We do not endorse either candidate. That's why we think Trump is a better choice for the American people. (Not we but @kazimovsaid)",
    provider_token: process.env.STRIPE_TOKEN,
    payload: "test",
    prices: [{ label: "ABCD", amount: 100 }],
    start_parameter: "abcd",
    photo_url:
      "https://i.pinimg.com/736x/69/ca/cb/69cacb9b2b1383435f37c5541261b38f.jpg",
  });
});

bot.on("pre_checkout_query", (ctx) => {
  ctx
    .answerPreCheckoutQuery(true)
    .then(() => console.log("Pre-checkout query answered"))
    .catch((err) => console.error("Failed to answer pre-checkout query", err));
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
