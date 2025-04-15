const { AllowUserIDs } = require('../../AllowUserIDs'); 

module.exports = {
    name: 'commands',
    description: 'Hiển thị danh sách các danh mục lệnh.',
    aliases: ['cmds'],
    execute(message) {
        // Kiểm tra nếu người dùng không có trong danh sách AllowUserIDs
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('❌ | Bạn không có quyền thực hiện lệnh này.');
        }

        const categories = [
            { name: 'AutoResponds', commands: ['Sử Dụng Lệnh ``see Autoresponds``'] },
            { name: 'AFK', commands: ['Sử Dụng Lệnh ``see AFK``'] },
            { name: 'Calculate', commands: ['Sử Dụng Lệnh ``see Calculate``'] },
            { name: 'Config', commands: ['Sử Dụng Lệnh ``see Config``'] },
            { name: 'Fun', commands: ['Sử Dụng Lệnh ``see Fun``'] },
            { name: 'General', commands: ['Sử Dụng Lệnh ``see General``'] },
            { name: 'Help', commands: ['Sử Dụng Lệnh ``see Help``'] },
            { name: 'Image', commands: ['Sử Dụng Lệnh ``see Image``'] },
            { name: 'Message', commands: ['Sử Dụng Lệnh ``see Message``'] },
            { name: 'Moderation', commands: ['Sử Dụng Lệnh ``see Moderation``'] },
            { name: 'NSFW', commands: ['Sử Dụng Lệnh ``see NSFW``'] },
            { name: 'Status', commands: ['Sử Dụng Lệnh ``see Status``'] },
            { name: 'Voice Setting', commands: ['Sử Dụng Lệnh ``see Voice Setting``'] },
            // Thêm các danh mục lệnh khác ở đây
        ];

        let response = '**Danh sách các danh mục lệnh:**\n Sử Dụng Lệnh ``<prefix>see <Tên Thư Mục>`` \n ';
        
        categories.forEach(category => {
            // Kiểm tra nếu category.commands có giá trị hợp lệ (không phải undefined hoặc rỗng)
            if (Array.isArray(category.commands) && category.commands.length > 0) {
                response += `**${category.name}:** ${category.commands.join(', ')}\n`;
            } else {
                response += `**${category.name}:** Không có lệnh nào.\n`;
            }
        });

        message.channel.send(response);
    },
};
