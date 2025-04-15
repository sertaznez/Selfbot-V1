const axios = require('axios');

module.exports = {
    name: 'vnd2chy',  
    aliases: ['v2c'],
    description: 'Chuyển đổi VND sang CNY',  
    async execute(message, args) {
        // Kiểm tra người dùng đã nhập số tiền cần chuyển đổi chưa
        if (args.length < 1) {
            return message.reply('Vui lòng nhập số tiền VND cần chuyển đổi (ví dụ: `v2c 100000`).');
        }

        const amount = parseFloat(args[0]);  // Số tiền VND cần chuyển đổi
        if (isNaN(amount) || amount <= 0) {
            return message.reply('Vui lòng nhập một số tiền hợp lệ.');
        }

        // Lấy tỷ giá VND sang CNY từ API
        try {
            const response = await axios.get('https://api.exchangerate-api.com/v4/latest/VND');

            // Kiểm tra xem dữ liệu có hợp lệ không
            if (!response.data || !response.data.rates || !response.data.rates.CNY) {
                return message.reply('Không thể lấy tỷ giá từ VND sang CNY. Dữ liệu không hợp lệ.');
            }

            const vndToCnyRate = response.data.rates.CNY;  // Lấy tỷ giá từ VND sang CNY

            // Tính toán số tiền CNY từ số tiền VND
            const result = amount * vndToCnyRate;

            // Trả về kết quả
            message.channel.send(`**${amount} VND** tương đương với **${result.toFixed(2)} CNY**.`);
        } catch (error) {
            console.error(error);
            message.reply('Đã xảy ra lỗi khi lấy tỷ giá. Vui lòng thử lại sau.');
        }
    },
};
