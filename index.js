require('dotenv').config();
const { Client, ChannelType } = require('discord.js-selfbot-v13');
const { joinVoiceChannel } = require('@discordjs/voice');

const client = new Client({ checkUpdate: false });

client.on('ready', async () => {
    console.log(`[LOGIN] ${client.user.tag} berhasil login.`);

    try {
        const guild = await client.guilds.fetch(process.env.GUILD_ID);
        const vcChannel = await guild.channels.fetch(process.env.VC_CHANNEL_ID);
        console.log(`[DEBUG] Jenis channel: ${vcChannel.type}`);

        joinVoiceChannel({
            channelId: vcChannel.id,
            guildId: guild.id,
            adapterCreator: guild.voiceAdapterCreator,
            selfDeaf: false,
            selfMute: false,
        });

        console.log(`[${client.user.tag}] Berhasil join voice channel.`);

        const textChannel = await guild.channels.fetch(process.env.TEXT_CHANNEL_ID);

        setTimeout(async () => {
            await textChannel.send('h5play pamungkas one only');
        }, 10000); // 10 detik

        setTimeout(async () => {
            await textChannel.send('h5autoplay');
        }, 15000); // 15 detik total (5 detik setelah pesan pertama)

    } catch (err) {
        console.error(`[${client.user.tag}] ERROR:`, err);
    }
});

client.login(process.env.TOKEN);