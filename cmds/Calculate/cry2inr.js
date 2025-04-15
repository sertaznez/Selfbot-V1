const axios = require('axios');  // Import axios để gửi yêu cầu HTTP
const { AllowUserIDs } = require('../../AllowUserIDs');  // Import danh sách AllowUserIDs

module.exports = {
    name: 'cry2inr',
    aliases: ['c2i'],  
    description: 'Chuyển đổi tiền từ Crypto sang INR', 
    async execute(message, args) {
        // Kiểm tra xem người dùng có quyền sử dụng lệnh không
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('Bạn không có quyền sử dụng lệnh này!');
        }

        // Kiểm tra xem người dùng có nhập đủ thông tin hay không
        if (args.length < 2) {
            return message.reply('Vui lòng nhập số tiền và loại crypto cần chuyển đổi (ví dụ: `c2i 0.01 bitcoin`).');
        }

        const amount = parseFloat(args[0]);  // Số tiền cần chuyển đổi, chuyển sang kiểu số
        const currency = args[1].toLowerCase();  // Loại crypto (ví dụ: bitcoin, ethereum)

        // Kiểm tra xem số tiền có hợp lệ không
        if (isNaN(amount) || amount <= 0) {
            return message.reply('Vui lòng nhập một số tiền hợp lệ.');
        }

        // Chuyển đổi Crypto sang INR bằng CoinGecko API
        try {
            // Gửi yêu cầu tới API CoinGecko để lấy tỷ giá
            const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${currency}&vs_currencies=inr`);
            
            // Kiểm tra xem API có trả về dữ liệu không
            if (!response.data[currency] || !response.data[currency].inr) {
                return message.reply('Không tìm thấy tỷ giá cho đồng tiền mã hóa này hoặc đồng tiền không hợp lệ.');
            }

            const cryptoToInrRate = response.data[currency].inr;  // Lấy tỷ giá Crypto sang INR

            // Kiểm tra xem tỷ giá có hợp lệ không
            if (isNaN(cryptoToInrRate) || cryptoToInrRate <= 0) {
                return message.reply('Tỷ giá của đồng tiền mã hóa không hợp lệ.');
            }

            // Tính toán số tiền chuyển đổi từ Crypto sang INR
            const result = amount * cryptoToInrRate;
            
            // Trả về kết quả
            message.channel.send(`**${amount} ${currency.toUpperCase()}** tương đương với **${result.toFixed(2)} INR**`);
        } catch (error) {
            // Xử lý lỗi nếu không thể lấy thông tin từ API
            console.error(error);
            message.reply('Không thể thực hiện chuyển đổi. Hãy kiểm tra lại tên đồng crypto hoặc thử lại sau.');
        }
    },
};
