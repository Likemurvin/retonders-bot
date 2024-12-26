// // Import the functions you need from the SDKs you need
require('dotenv').config()
const{Bot, GrammyError, HttpError, InlineKeyboard, Keyboard, session} = require('grammy')

const bot = new Bot(process.env.BOT_API_KEY)
const f = require('./utility');
const wd = require('./getdata')
const nft = require('./getnftdata')

var balance = ''

bot.api.get
const inlineKeyboard = new InlineKeyboard().text("Прикрепить кошель", "add-wallet").url("GORA LABOR",'https://t.me/uniongora').row().text("О проекте", "project-info");

// Install session middleware, and define the initial session value.
function initial() {
    return { userWallet: '' , retonders: [], rekwizit: [], points: 0};
}
  bot.use(session({ initial }));

bot.api.setMyCommands([
    {
        command: 'start',
        description: 'Главное меню'
    }
])

bot.command('start', async(ctx) => {
    const chatId = ctx.chatId;
    const guestID = ctx.update.message.from.id
    // console.log(ctx.update.message.from)

     // Photo URL or file path
     const photoUrl = 'https://i.pinimg.com/736x/28/9f/34/289f34a5cc7c1c7f84fc41617a163d0c.jpg'; // Replace with your photo URL or local file path
    //  const photoUrl = '/prowodnik.png'; // Replace with your photo URL or local file path

     // Text message
     const messageText = "Добро пожаловать, путник\\! \n\nТы на главной странице *PROWODNIKA* \\- устройства случайно забытого [SKORUP'ой](https://getgems.io/collection/EQDozSelAkli4bhpG_3SPi7RLLT_cxGYjbKsTVTCKv4zHzCg/EQBuQCOj4Kg3FnV7DRfdn-QFnpMCPbyDRse9ZZtsGrk_mS_6)";
// const inlineKeyboard = new InlineKeyboard().text("Чекнуть кошель", "check-wallet").url("GORA LABOR",'https://t.me/uniongora').row().text("О проекте", "project-info");
    
    var main_button = { text: 'Прикрепить кошель', callback_data: 'add-wallet' }
    //  Inline keyboard configuration
    if(ctx.session.userWallet == ''){
        main_button = { text: 'Прикрепить кошель', callback_data: 'add-wallet' }
    } else {
        main_button = { text: 'Инфа о кошельке', callback_data: 'check-wallet' }
    }
    const inlineKeyboard = 
    {
        reply_markup: {
            inline_keyboard: [
                [
                    main_button,
                    { text: 'GORA LABOR', url: 'https://t.me/uniongora' },
                ],
                [
                    { text: 'О проекте', url: 'https://teletype.in/@goralabor/slownik' },
                    // { text: 'Проверить подписку', callback_data: 'check-sub' },
                ],
            ],
        },
    };
     // Send photo with text and inline keyboard
     await bot.api.sendPhoto(chatId, photoUrl, {
         caption: messageText,
         parse_mode: "MarkdownV2",
         ...inlineKeyboard,
     });
})

bot.callbackQuery('check-wallet', async(ctx) => {
    const custKey = new InlineKeyboard().text('Открепить', 'deattach-wallet').text('Вернуться', 'go-back').row().text("Как считаются MONET'ы?",'points-info')
    // await ctx.reply(`Да ты настоящий приключенец! \nСтата по твоему кошелю: \n\nRETONDERS: ${ctx.session.retonders.length}\nREKWIZIT: ${ctx.session.rekwizit.length}\n🪙 MONET за ретондеров: ${ctx.session.points} \n🪙 MONET за реквизит: ${ctx.session.rekwizit.length * 10} \n\nВсего 🪙 MONET: ${ctx.session.rekwizit.length * 10 + ctx.session.points}`, {reply_markup: custKey})
    await ctx.reply(`Стата по твоему кошелю: \n\n🤹‍♂️ *RETONDERS*: ${ctx.session.retonders.length}\n🪛 *REKWIZIT*: ${ctx.session.rekwizit.length}\n🪙 *MONET*: ${ctx.session.points} `, {reply_markup: custKey, parse_mode: "MarkdownV2"})
})

bot.callbackQuery('points-info', async(ctx) => {
    const custKey = new InlineKeyboard().text('Вернуться', 'go-back')
    await ctx.reply(`Сейчас на твоем кошельке ${ctx.session.points} 🪙\n\nMONET'ы считаются исходя из наших NFT у тебя в холде, за каждый реквизит мы начисляем по 10 🪙, за каждого ретондера - в зависимости от его рарности:\n>> SIMPLE: 5\n>> USUAL: 15\n>>ODD: 20\n>> WEIRD: 30\n>> BIZZARE: 50\n>> SPECIAl: 30 \n\nЗа количество ретондеров мы также даем бонус: \n\n• 2 ретондера: +10 🪙 \n• 3-5 ретондеров: +30 🪙 \n• Больше 5 ретондеров: +70 🪙`, {reply_markup: custKey})
})

bot.callbackQuery('add-wallet', async(ctx) => {
    await ctx.reply('Введи адрес своего кошеля в сети TON:')
})

bot.callbackQuery('deattach-wallet', async(ctx) => {
    ctx.session = { userWallet: '' , retonders: [], rekwizit: [], points: 0};
    // console.log(ctx.session)
    await ctx.reply('Кошель успешно отключен')
})

bot.callbackQuery('go-back', async(ctx) => { 
    const chatId = ctx.chatId;
    const photoUrl = 'https://i.pinimg.com/736x/28/9f/34/289f34a5cc7c1c7f84fc41617a163d0c.jpg'; // Replace with your photo URL or local file path
    const messageText = "Добро пожаловать, путник\\! \n\nТы на главной странице *PROWODNIKA* \\- устройства случайно забытого [SKORUP'ой](https://getgems.io/collection/EQDozSelAkli4bhpG_3SPi7RLLT_cxGYjbKsTVTCKv4zHzCg/EQBuQCOj4Kg3FnV7DRfdn-QFnpMCPbyDRse9ZZtsGrk_mS_6)";
    var main_button = { text: 'Прикрепить кошель', callback_data: 'add-wallet' }
    //  Inline keyboard configuration
    if(ctx.session.userWallet == ''){
        main_button = { text: 'Прикрепить кошель', callback_data: 'add-wallet' }
    } else {
        main_button = { text: 'Инфа о кошельке', callback_data: 'check-wallet' }
    }
    const inlineKeyboard = 
    {
        reply_markup: {
            inline_keyboard: [
                [
                    main_button,
                    { text: 'GORA LABOR', url: 'https://t.me/uniongora' },
                ],
                [
                    { text: 'О проекте', url: 'https://teletype.in/@goralabor/slownik' },
                ],
            ],
        },
    };
 
     await bot.api.sendPhoto(chatId, photoUrl, {
         caption: messageText,
         parse_mode: "MarkdownV2",
         ...inlineKeyboard,
     });

})


// bot.on("message", (ctx) => ctx.react("👍"));

bot.on('message', async(ctx) => {
    const message = ctx.message.text;
    const guestID = ctx.update.message.from
    let nft_info = []
    let nft_data = []
    let retonders_v = []
    let rekwizit_v = []

//  Смотрим есть ли ретондеры в кошеле:
    if(ctx.session.userWallet == ''){
        await wd.getWalletInformation(message, 'EQDozSelAkli4bhpG_3SPi7RLLT_cxGYjbKsTVTCKv4zHzCg').then(data => {
            const walletInfo = data; // Store the data in a variable
            for(let ni = 0; ni<walletInfo.nft_items.length; ni++){
                retonders_v.push(walletInfo.nft_items[ni].content.uri)
            }
        }).catch(error => console.error('Error:', error.message));
        
        // Смотрим есть ли реквизит в кошеле:
        await wd.getWalletInformation(message, 'EQBPJCOTvf7_mm8QfHmdm8nhxOMjJZxQlm9r3MGCJsWxL1GW').then(data => {
            const walletInfo = data; // Store the data in a variable
            for(let ni = 0; ni<walletInfo.nft_items.length; ni++){
                rekwizit_v.push(walletInfo.nft_items[ni].content.uri)
            }
            }).catch(error => console.error('Error:', error.message));
        } else {
            await ctx.reply(`Ты успешно прикрепил кошель! \nТвой кошель: ${ctx.session.userWallet}\n\n RETONDERS в кошеле: ${ctx.session.retonders.length} \n\n REKWIZIT в кошеле: ${ctx.session.rekwizit.length}\n\n 🪙 MONET: ${ctx.session.points} `)
        }

        await Promise.all(retonders_v.map(async (e) => {
            const data = await nft.fetchData(e);
            ctx.session.retonders.push(data);
        }));

        await Promise.all(rekwizit_v.map(async (e) => {
            const data = await nft.fetchData(e);
            ctx.session.rekwizit.push(data);
        }));

        // console.log('Retonders session:' + ctx.session.retonders.length)
        // console.log('Rekwizit session:' + ctx.session.rekwizit.length)

    // Writing data to session storage
    if((ctx.session.retonders.length > 0 || ctx.session.rekwizit.length > 0) && (ctx.session.userWallet == '')){
        // ctx.react("✅")
        ctx.session.userWallet = ctx.message.text
        // ctx.session.rekwizit = rekwizit

        const ret_amount = ctx.session.retonders.length
        const rek_amount = ctx.session.rekwizit.length

        let points_counter = 0
        let bonus = 0

        const rarity = {
            SIMPLE: 5,
            USUAL:15,
            ODD:20,
            WEIRD:30,
            BIZARRE:50,
            SPECIAL:30,
            SPECIAL_EDITION:30
        }

      await ctx.session.retonders.forEach((e,index) => {
            const rar = e.attributes[0].value

            if(rar == 'SIMPLE'){
                points_counter += rarity.SIMPLE
                ctx.session.points += rarity.SIMPLE
            } 
            if(rar == 'USUAL'){
                points_counter += rarity.USUAL
                ctx.session.points += rarity.USUAL
            } 
            if(rar == 'ODD'){
                points_counter += rarity.ODD
                ctx.session.points += rarity.ODD
            }
            if(rar == 'WEIRD'){
                points_counter += rarity.WEIRD
                ctx.session.points += rarity.WEIRD
            }
            if(rar == 'BIZARRE'){
                points_counter += rarity.BIZARRE
                ctx.session.points += rarity.BIZARRE
            }
            if(rar == 'SPECIAL'){
                points_counter += rarity.SPECIAL
                ctx.session.points += rarity.SPECIAL
            }if(rar == 'SPECIAL EDITION'){
                points_counter += rarity.SPECIAL
                ctx.session.points += rarity.SPECIAL
            }

            // ctx.session.points = points_counter
        })
    if(ret_amount == 2){
        bonus = 10
        ctx.session.points += 10
    }
    if(ret_amount > 2 && ret_amount < 6){
        bonus = 30
        ctx.session.points += 30
    }
    if(ret_amount > 5){
        bonus = 70
        ctx.session.points += 70
    }

    ctx.session.points += ctx.session.rekwizit.length*10
    // console.log('Countings results: Bonus - ' + bonus + ' Points' + points_counter + ' points in session:' + ctx.session.points)

    const custKey = new InlineKeyboard().text('Открепить', 'deattach-wallet').text('Вернуться', 'go-back')
    console.log(`User ${guestID.username} linked wallet ${ctx.session.userWallet} amount of points: ${ctx.session.points}`)
    await ctx.reply(`Похоже что у тебя есть RETONDER'ы: ${ctx.session.retonders.length} и REKWIZIT'ы: ${ctx.session.rekwizit.length}\n\n СЧИТАЕМ MONET'ы....\n\n🪙 за ретондеров: ${points_counter} \n🪙 за реквизит: ${ctx.session.rekwizit.length * 10} \n🪙 за холд: ${bonus} \n\n=============== \nВсего 🪙 MONET: ${ctx.session.points} \n\nКошель успешно добавлен в PROWODNIK `, {reply_markup: custKey})
    
    } else if(ctx.session.userWallet == ''){
        await ctx.reply(`Здесь пусто, попробуй другой кошель...`)
    }
})

bot.catch((err) => {
    const ctx = err.ctx;
    console.log(`Error while handling update ${ctx.update.update_id}:`)
    const e = err.error;

    if(e instanceof GrammyError){
        console.error("Error in request:", e.description)
    } else if(e instanceof HttpError){
        console.error("Could not contact Telegram:", e)
    } else {
        console.error("Unknown error:", e)
    }
})

bot.start();