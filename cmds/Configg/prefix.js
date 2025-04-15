const { AllowUserIDs } = require('../../AllowUserIDs'); 

module.exports = {
    name: 'prefixset', // Tên lệnh
    description: 'Xem hoặc thay đổi prefix của bot.',
  
    async execute(message, args) {
        // Kiểm tra xem người dùng có quyền thay đổi prefix không
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('Bạn không có quyền thay đổi prefix!');
        }

        // Kiểm tra nếu không có đối số nào được nhập
        if (args.length === 0) {
            return message.reply(`Prefix hiện tại của bot là: \`${process.env.PREFIX || '>' }\``);
        }
  
        // Thay đổi prefix
        const newPrefix = args[0];
  
        if (newPrefix.length > 5) {
            return message.reply("Prefix không được dài quá 5 ký tự.");
        }
  
        // Cập nhật prefix mới vào tệp .env hoặc file lưu cấu hình của bạn
        process.env.PREFIX = newPrefix;
  
        message.reply(`Prefix đã được thay đổi thành: \`${newPrefix}\``);
    },
};
