const { AllowUserIDs } = require('../../AllowUserIDs');

module.exports = {
    name: 'rizz',
    description: 'Tán tỉnh ai đó với rizz!',
    async execute(message, args) {
        // Kiểm tra xem người gửi lệnh có phải là một trong các người dùng được phép không
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('Bạn không có quyền sử dụng lệnh này!');
        }

        if (args.length === 0) {
            return message.reply('Bạn cần phải chỉ rõ người bạn muốn tán tỉnh! Ví dụ: `!rizz <tên>`');
        }

        const target = args.join(' ');  // Lấy tên người nhận
        const rizzResponses = [
            `Chào ${target}, bạn có biết không, tôi đã rơi vào tình yêu ngay từ lần đầu tiên gặp bạn? 😘`,
            `${target}, bạn làm tôi mê mẩn hơn cả chiếc pizza mới ra lò! 🍕`,
            `Mỗi lần nhìn vào đôi mắt của bạn, ${target}, tôi thấy cả vũ trụ đang xoay quanh mình. 🌌`,
            `Này ${target}, bạn có phải là ma thuật không? Vì mỗi khi bạn xuất hiện, tôi cảm thấy như có phép màu! ✨`,
            `Bộ não của tôi có vấn đề rồi, tôi không thể ngừng nghĩ về bạn, ${target}. 😅`
        ];

        // Lấy câu rizz ngẫu nhiên từ mảng
        const randomRizz = rizzResponses[Math.floor(Math.random() * rizzResponses.length)];

        // Gửi câu rizz
        message.channel.send(randomRizz);
    },
};
