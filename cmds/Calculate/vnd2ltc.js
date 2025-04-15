const axios = require('axios');
const { AllowUserIDs } = require('../AllowUserIDs'); // Import danh sách user được phép

module.exports = {
    name: 'vnd2ltc',
    description: 'Chuyển đổi Việt Nam Đồng (VND) sang Litecoin (LTC)',
    async execute(message, args) {
        // Kiểm tra xem người dùng có trong danh sách cho phép không
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('Bạn không có quyền sử dụng lệnh này!');
        }

        try {
            // Lấy tỷ giá LTC sang VND từ CoinGecko
            const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=litecoin&vs_currencies=vnd');
            const rate = response.data.litecoin.vnd;

            // Kiểm tra xem người dùng có cung cấp số tiền VND không
            const amount = args.length > 0 ? parseFloat(args[0]) : null;
            if (!amount || isNaN(amount) || amount <= 0) {
                return message.reply('Vui lòng cung cấp một số tiền VND hợp lệ.');
            }

            // Tính toán số LTC tương ứng
            const convertedAmount = (amount / rate).toFixed(8); // 8 chữ số thập phân như chuẩn crypto

            // Gửi kết quả cho người dùng
            message.reply(`${amount.toLocaleString('vi-VN')} VND tương đương với ${convertedAmount} LTC.`);
        } catch (error) {
            console.error('Lỗi khi lấy tỷ giá LTC:', error);
            message.reply('Xin lỗi, tớ không thể lấy được tỷ giá LTC vào lúc này.');
        }
    },
};
