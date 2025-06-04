import { Client} from "whatsapp-web.js";
import { UserData } from "./data.ts";

export async function startConversation(api: Client, user: UserData) {
   
    await api.sendMessage(
        user.id,
        `Olá ,  ${user.name}! \n Sou a assistente virtual da empresa Floffypaper e irei te ajudar. \n\n Digite uma das opções abaixo:\n \n *1 - Produtos disponíveis* \n *2 - Realizar pedido*\n *3 - Formas de entrega*\n *4 - Redes sociais* \n *5 - Quero falar com um humano* \n\n Para acessar as opções novamente digite "menu"`
    );
   
}

