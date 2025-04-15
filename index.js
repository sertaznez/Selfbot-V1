const { Client, Collection } = require('discord.js-selfbot-v13');
const sqlite3 = require('sqlite3').verbose();
const axios = require('axios');
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Khởi tạo client
const client = new Client();

// Tạo một Collection để lưu lệnh và AFK
client.commands = new Map();
const afkUsers = new Collection();

// Đường dẫn file responses.json
const responseFile = path.join(__dirname, "./data/responses.json");

// Đảm bảo file responses.json tồn tại
if (!fs.existsSync(responseFile)) {
    fs.writeFileSync(responseFile, JSON.stringify({}, null, 2));
}

// Đọc tất cả thư mục trong cmds/
const categories = fs.readdirSync(path.join(__dirname, "cmds"));

// Load các lệnh
for (const category of categories) {
    const commandFiles = fs.readdirSync(path.join(__dirname, `cmds/${category}`)).filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
        const command = require(`./cmds/${category}/${file}`);
        client.commands.set(command.name, command);
        console.log(`✅ Loaded command: ${command.name} from category: ${category}`);
    }
}

client.on("messageCreate", async (message) => {
    const prefix = process.env.PREFIX || "";
    const userId = process.env.ID_DISCORD;

    if (message.author.bot) return;

    // Kiểm tra nếu có ping người AFK
    const mentionedUser = message.mentions.users.get(userId);
    if (mentionedUser && afkUsers.has(userId)) {
        const afkData = afkUsers.get(userId);
        message.reply(`hiện tại đang **AFK <t:${afkData.time}:R>**\n **Reason:** ${afkData.reason}`);
    }

    // Kiểm tra Auto Respond
    const responses = JSON.parse(fs.readFileSync(responseFile, "utf8"));
    const trigger = message.content.toLowerCase();
    if (responses[trigger]) {
        return message.reply(responses[trigger]); // Gửi phản hồi
    }

    // Kiểm tra nếu tin nhắn là lệnh
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (commandName === "afk") {
        if (message.author.id !== userId) return;
        const reason = args.join(" ") || "";
        afkUsers.set(userId, { time: Math.floor(Date.now() / 1000), reason });

        // Đổi tên người dùng thêm "[AFK] - " vào trước tên
        const member = await message.guild.members.fetch(userId);
        await member.setNickname(`[AFK] - ${member.displayName}`);
        
        return message.react("✅");
    }

    if (commandName === "unafk") {
        if (message.author.id !== userId) return;

        if (afkUsers.has(userId)) {
            afkUsers.delete(userId);

            // Xóa "[AFK] - " khỏi tên người dùng
            const member = await message.guild.members.fetch(userId);
            await member.setNickname(member.displayName.replace("[AFK] - ", ""));
            return message.react("✅");
        } else {
            message.reply("Bạn không phải là AFK.");
        }
    }

    // Tìm lệnh hoặc alias tương ứng
    const command = client.commands.get(commandName) ||
                    [...client.commands.values()].find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply("Có lỗi xảy ra khi chạy lệnh này!");
    }
});

client.login(process.env.DISCORD_TOKEN);
