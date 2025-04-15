const axios = require('axios');

module.exports = {
    name: 'chy2vnd',
    aliases: ['c2v'],
    description: 'Chuyển đổi từ Nhân dân tệ (CNY) sang Việt Nam đồng (VND).',
    async execute(message, args) {
        // Kiểm tra xem người dùng đã nhập số tiền chưa
        if (args.length < 1) {
            return message.reply('Vui lòng nhập số tiền CNY cần chuyển đổi (ví dụ: `c2v 100`).');
        }

        const amount = parseFloat(args[0]); // Lấy số tiền CNY từ tham số
        if (isNaN(amount) || amount <= 0) {
            return message.reply('Vui lòng nhập một số tiền hợp lệ.');
        }

        // Lấy tỷ giá CNY -> VND từ API
        try {
            const response = await axios.get('https://api.exchangerate-api.com/v4/latest/CNY');

            if (!response.data || !response.data.rates || !response.data.rates.VND) {
                return message.reply('Không thể lấy tỷ giá từ CNY sang VND. Vui lòng thử lại sau.');
            }

            const cnyToVndRate = response.data.rates.VND; // Lấy tỷ giá
            const result = amount * cnyToVndRate; // Tính toán

            message.channel.send(` **${amount} CNY** tương đương với **${result.toLocaleString()} VND**.`);
        } catch (error) {
            console.error(error);
            message.reply('Đã xảy ra lỗi khi lấy tỷ giá. Vui lòng thử lại sau.');
        }
    },
};
