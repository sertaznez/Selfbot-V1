const axios = require('axios');
const { AllowUserIDs } = require('../../AllowUserIDs');  // Import danh sách AllowUserIDs

module.exports = {
    name: 'doitien',  // Tên lệnh
    description: 'Chuyển đổi giữa các loại tiền tệ',  // Mô tả lệnh
    async execute(message, args) {
        // Kiểm tra xem người dùng có quyền sử dụng lệnh không
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('Bạn không có quyền sử dụng lệnh này!');
        }

        // Kiểm tra xem người dùng có nhập đúng số lượng đối số không
        if (args.length !== 4) {
            return message.reply('Vui lòng nhập đúng định dạng: `doitien <số tiền> <tiền gốc> to <tiền muốn sang>`');
        }

        const amount = parseFloat(args[0]);  // Số tiền cần chuyển đổi
        const fromCurrency = args[1].toUpperCase();  // Tiền gốc
        const toCurrency = args[3].toUpperCase();  // Tiền muốn chuyển đến

        // Kiểm tra số tiền hợp lệ
        if (isNaN(amount) || amount <= 0) {
            return message.reply('Vui lòng nhập một số tiền hợp lệ.');
        }

        // Lấy tỷ giá từ API
        try {
            const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);

            // Kiểm tra xem dữ liệu có hợp lệ không
            if (!response.data || !response.data.rates || !response.data.rates[toCurrency]) {
                return message.reply(`Không thể lấy tỷ giá từ **${fromCurrency} sang ${toCurrency}**. Kiểm tra lại mã tiền tệ.`);
            }

            const conversionRate = response.data.rates[toCurrency];  // Lấy tỷ giá chuyển đổi

            // Tính toán số tiền chuyển đổi
            const result = amount * conversionRate;

            // Gửi kết quả
            message.channel.send(`**${amount} ${fromCurrency}** tương đương với **${result.toFixed(2)} ${toCurrency}**.`);
        } catch (error) {
            console.error(error);
            message.reply('Đã xảy ra lỗi khi lấy tỷ giá. Vui lòng thử lại sau.');
        }
    },
};
