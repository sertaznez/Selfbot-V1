const axios = require('axios');
const { AllowUserIDs } = require('../../AllowUserIDs');  // Import danh sách các user ID được phép

module.exports = {
    name: 'usd2ltc',  
    aliases: ['u2l'],
    description: 'Chuyển đổi USD sang LTC', 
    async execute(message, args) {
        // Kiểm tra xem người dùng có nằm trong danh sách AllowUserIDs không
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('Bạn không có quyền sử dụng lệnh này.');
        }

        // Kiểm tra người dùng đã nhập số tiền cần chuyển đổi chưa
        if (args.length < 1) {
            return message.reply('Vui lòng nhập số tiền USD cần chuyển đổi (ví dụ: `u2l 100`).');
        }

        const amount = parseFloat(args[0]);  // Số tiền USD cần chuyển đổi
        if (isNaN(amount) || amount <= 0) {
            return message.reply('Vui lòng nhập một số tiền hợp lệ.');
        }

        // Lấy tỷ giá USD sang LTC từ API CoinGecko
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
                params: {
                    ids: 'litecoin',
                    vs_currencies: 'usd',
                }
            });

            const usdToLtcRate = 1 / response.data.litecoin.usd;  // Tính tỷ giá từ USD sang LTC

            if (!usdToLtcRate) {
                return message.reply('Không thể lấy tỷ giá từ USD sang LTC.');
            }

            // Tính toán số tiền LTC từ số tiền USD
            const result = amount * usdToLtcRate;
            
            message.channel.send(`**${amount} USD** tương đương với **${result.toFixed(4)} LTC**.`);
        } catch (error) {
            console.error(error);
            message.reply('Đã xảy ra lỗi khi lấy tỷ giá. Vui lòng thử lại sau.');
        }
    },
};
