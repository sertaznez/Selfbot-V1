const math = require('mathjs'); // Import mathjs
const { AllowUserIDs } = require('../../AllowUserIDs'); // Import danh sách AllowUserIDs

module.exports = {
    name: 'calculate',
    aliases: ['calc', 'math'],
    description: 'Thực hiện phép tính toán đơn giản.',
    execute(message, args) {
        // Kiểm tra nếu người dùng không có quyền thực thi lệnh
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('Bạn không có quyền sử dụng lệnh tính toán!');
        }

        if (!args.length) {
            return message.reply("Vui lòng nhập phép toán cần tính toán.");
        }

        try {
            // Nối tất cả các phần từ trong args thành một chuỗi và tính toán
            const expression = args.join(' ');
            const result = math.evaluate(expression); // Sử dụng mathjs để tính toán
            message.channel.send(`Kết quả của phép tính **${expression}** là: **${result}**`);
        } catch (error) {
            message.reply("Có lỗi xảy ra, vui lòng kiểm tra lại phép tính.");
        }
    },
};
