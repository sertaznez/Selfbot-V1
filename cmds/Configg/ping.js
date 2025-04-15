module.exports = {
    name: "ping",
    category: "general",
    description: "Kiểm tra độ trễ của bot",
    execute(message, args) {
      message.channel.send(`🏓 Pong! Độ trễ: ${Date.now() - message.createdTimestamp}ms`);
    }
  };
  