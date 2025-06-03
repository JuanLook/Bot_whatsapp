import { Client } from "whatsapp-web.js";
import { UserData } from "./data";
import { startConversation } from "./messages";

export const enum MenuOptions {
    PRODUTOS = "1",
    PEDIDOS = "2",
    ENTREGAS = "3",
    REDES_SOCIAIS = "4",
    ATENDIMENTO = "5"

}
const GRUPO_ADM = "120363370058127166@g.us";

export async function sendMenu(api: Client, user: UserData) {
    
    switch (user.message) {
      
        case MenuOptions.PRODUTOS:
            
            await api.sendMessage(user.id, 
                `*📦 Produtos Disponíveis:*\n\n` +
                `📘 *Agenda/Planner* - a partir de *R$89,90*\n\n` +
                ` Colorir *Boobie Goods (180g)*\n` +
                `- 50 folhas: *R$49,99*     ` +
                `- 70 folhas: *R$59,99*     ` +
                `- 100 folhas: *R$85,99*\n\n` +
                `🎒 *Etiqueta Escolar* (kit com 80 unidades) - *R$36,50*\n\n` +
                `🎂 *Topos de Bolo*:\n` +
                `- Camadas: a partir de *R$29,99*       ` +
                `- Shaker: a partir de *R$49,99*\n\n` +
                `🎁 *Caixas Cartonadas* - a partir de *R$20,00*\n\n` +
                `📸 *Fotos Polaroides Mini* (10 unidades):\n` +
                `- Sem ímã: *R$25,00*       ` +
                `- Com ímã: *R$35,00*\n\n` +
                `📖 *Reformas de Bíblias* - a partir de *R$55,00*\n\n`
              );
               await api.sendMessage(user.id,`Deseja encomendar outro produto que não está na lista?\n                 [S] Sim   [N] Não`);
              api.on('message', async (message) => {
                if (message.from === user.id) { // Verifica se a mensagem veio do usuário esperado
                    if (message.body.toUpperCase() === 'S') {
                        await api.sendMessage(user.id, 'Você contactou um atendente e será respondido o mais breve possivel...');
                        await api.sendMessage(GRUPO_ADM, `CONTACTANDO ATENDIMENTO: \n \n O usuario ${user.name} precisa de atendimento...`);

                    } else if (message.body.toUpperCase() === 'N') {
                        await api.sendMessage(
                            user.id,
                            `Você escolheu "Não" digite outra opção para continuarmos o atendimento  ${user.name}! \n \n\n Digite uma das opções abaixo:\n \n *1 - Produtos disponíveis* \n *2 - Realizar pedido*\n *3 - Formas de entrega*\n *4 - Redes sociais* \n *5 - Quero falar com um humano*`
                        );
                    } 
                }
            });

            break;

        case MenuOptions.PEDIDOS:
            
            await api.sendMessage(user.id, 'Para agilizar a operação precisarei que informe algumas informações antes de prosseguir para o atendimento com uma de nossas atendentes. \n  \n   \n Qual de nossos produtos você deseja?   \n Qual a data que você precisa receber o pedido?  \n Cep:');
            await api.sendMessage(GRUPO_ADM,`REALIZANDO PEDIDO:\n \n O usuario ${user.name} está realizando um pedido `);
            break;

        case MenuOptions.ENTREGAS:       
            await api.sendMessage(user.id, 'trabalhamos com as seguintes formas de entrega: \n \n Retirada no endereço *( cruzeiro novo/DF )* \n \n Entrega em até X dias úteis o preço varia de acordo com a região, para realizar o cálculo informe endereço completo com cep');
            break;

        case MenuOptions.REDES_SOCIAIS:
            await api.sendMessage(user.id, 
                'Nos siga no instagram: \n' + 
                'https://www.instagram.com/floffypaper/'
            );
            
            break;
        case MenuOptions.ATENDIMENTO:
            
            await api.sendMessage(user.id, 'Você contactou um atendente e será respondido o mais breve possivel...');
            await api.sendMessage(GRUPO_ADM, `CONTACTANDO ATENDIMENTO: \n \n O usuario ${user.name} precisa de atendimento...`);
            break;
        default:
            break;
    }
}
