const axios = require('axios');  // Import axios để gửi yêu cầu HTTP
const { AllowUserIDs } = require('../../AllowUserIDs');  // Import danh sách các user ID được phép

module.exports = {
    name: 'ltc2usd',  
    aliases: ['l2u'],
    description: 'Chuyển đổi LTC sang USD',  
    async execute(message, args) {
        // Kiểm tra xem người dùng có nằm trong danh sách AllowUserIDs không
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('Bạn không có quyền sử dụng lệnh này.');
        }

        // Kiểm tra xem người dùng có nhập đủ thông tin không
        if (args.length < 1) {
            return message.reply('Vui lòng nhập số tiền LTC cần chuyển đổi (ví dụ: `l2u 0.01`).');
        }

        const amount = parseFloat(args[0]);  // Số tiền LTC cần chuyển đổi
        if (isNaN(amount) || amount <= 0) {
            return message.reply('Vui lòng nhập một số tiền hợp lệ.');
        }

        // Lấy tỷ giá LTC sang USD từ CoinGecko API
        try {
            // Gửi yêu cầu tới API CoinGecko để lấy tỷ giá
            const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=litecoin&vs_currencies=usd');

            // Kiểm tra xem API có trả về dữ liệu không
            if (!response.data.litecoin || !response.data.litecoin.usd) {
                return message.reply('Không tìm thấy tỷ giá cho Litecoin hoặc đồng tiền không hợp lệ.');
            }

            const ltcToUsdRate = response.data.litecoin.usd;  // Lấy tỷ giá LTC sang USD

            // Kiểm tra xem tỷ giá có hợp lệ không
            if (isNaN(ltcToUsdRate) || ltcToUsdRate <= 0) {
                return message.reply('Tỷ giá của Litecoin không hợp lệ.');
            }

            // Tính toán số tiền chuyển đổi từ LTC sang USD
            const result = amount * ltcToUsdRate;
            
            // Trả về kết quả
            message.channel.send(`**${amount} LTC** tương đương với **${result.toFixed(2)} USD**`);
        } catch (error) {
            // Xử lý lỗi nếu không thể lấy thông tin từ API
            console.error(error);
            message.reply('Không thể thực hiện chuyển đổi. Hãy kiểm tra lại tên đồng crypto hoặc thử lại sau.');
        }
    },
};
