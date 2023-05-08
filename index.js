const telegramBot = require("node-telegram-bot-api");

require("dotenv").config();

const TOKEN = process.env.TOKEN;

const bot = new telegramBot(TOKEN, { polling: true });

let start = "";
let firstName = "";
let lastName = "";
let phoneNumber = "";
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Enter Your First Name: ");
  start = msg.text;
  firstName = "";
  lastName = "";
  phoneNumber = "";
  // console.log(msg.text);
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  console.log(chatId);
  // console.log("Start = ", start);
  if (start !== "" && firstName === "") {
    // console.log("first-name =", msg.text);
    firstName = msg.text;
    bot.sendMessage(chatId, "Enter Your Last Name:");
    console.log(start, "-", firstName);
  } else if (firstName !== "" && lastName === "") {
    // console.log("last-name =", msg.text);
    lastName = msg.text;
    bot.sendMessage(chatId, "Enter Your Phone Number:");
    console.log(start, "-", firstName, "-", lastName);
  } else if (lastName !== "" && phoneNumber === "") {
    // console.log("phone =", msg.text);
    phoneNumber = msg.text;
    console.log(start, "-", firstName, "-", lastName, "-", phoneNumber);
    bot.sendMessage(chatId, `Hi ${firstName} ${lastName}, ${phoneNumber}`);
    firstName = "";
    lastName = "";
    phoneNumber = "";
    start = "";
  }
  // else if (
  //   start !== "" &&
  //   firstName !== "" &&
  //   lastName !== "" &&
  //   phoneNumber !== ""
  // ) {
  //   console.log(start, "-", firstName, "-", lastName, "-", phoneNumber);
  //   // console.log("her");
  //   bot.sendMessage(chatId, `Hi ${firstName} ${lastName}, ${phoneNumber}`);
  //   firstName = "";
  //   lastName = "";
  //   phoneNumber = "";
  // }
});
