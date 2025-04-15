const axios = require('axios');
const { AllowUserIDs } = require('../../AllowUserIDs');

module.exports = {
    name: 'ltc2vnd',
    description: 'Chuyển đổi Litecoin (LTC) sang Việt Nam Đồng (VND)',
    async execute(message, args) {
        // Kiểm tra xem người dùng có trong danh sách cho phép không
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('Bạn không có quyền sử dụng lệnh này!');
        }

        try {
            // Lấy tỷ giá LTC sang VND từ CoinGecko
            const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=litecoin&vs_currencies=vnd');
            const rate = response.data.litecoin.vnd;

            // Kiểm tra xem người dùng có cung cấp số lượng LTC không
            const amount = args.length > 0 ? parseFloat(args[0]) : 1;
            if (isNaN(amount) || amount <= 0) {
                return message.reply('Vui lòng cung cấp một số lượng LTC hợp lệ.');
            }

            // Tính toán giá trị tương ứng bằng VND
            const convertedAmount = (amount * rate).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

            // Gửi kết quả cho người dùng
            message.reply(`${amount} LTC tương đương với ${convertedAmount}.`);
        } catch (error) {
            console.error('Lỗi khi lấy tỷ giá LTC:', error);
            message.reply('Xin lỗi, tớ không thể lấy được tỷ giá LTC vào lúc này.');
        }
    },
};
