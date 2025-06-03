import { Client, LocalAuth, Message } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import DataBase, { UserData } from "./data.ts";
import { startConversation } from "./messages.ts";
import { sendMenu } from "./menu.ts";

const localAuth = new LocalAuth();

const client = new Client({
  authStrategy: localAuth,
  puppeteer: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

client.on("qr", (qr) => {
    console.log("QR Code recebido. Escaneie com o WhatsApp:");
    qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
    console.log("WhatsApp Web conectado!");
    console.log(
        "   ____   _   _  \n  / __ \\ | \\ | | \n | |  | ||  \\| | \n | |  | || . ` | \n | |__| || |\\  | \n  \\____/ |_| \\_| \n"
      );
});


client.on("auth_failure", (msg) => {
    console.error("Erro de autenticação:", msg);
});

client.on("disconnected", (reason) => {
    console.log("Cliente desconectado. Motivo:", reason);
});

client.on('message', async (message) => {
    chatBotFuncion(message);
});

client.initialize();

async function chatBotFuncion(msg: Message) {
    const contact = await msg.getContact();
    const name = contact.pushname;
    const id = msg.from;

    if(id.endsWith("@c.us")) {
        let user = DataBase.getUserById(id);

        if (!user) {
            user = {
                id: id,
                name: name,
                lastInteractionDate: new Date(),
                hasStartedConversation: false, 
                message: msg.body,
                currentState: "other"
            };
    
            DataBase.addUser(user);
        } else {
    
            user.lastInteractionDate = new Date();
            user.message = msg.body;
        }
    
        if (!user.hasStartedConversation) {
            user.hasStartedConversation = true;
            user.currentState = "menu";
            await startConversation(client, user);
    
        } 
    
        if(user.message.toLowerCase() === "menu") {
            user.currentState = "menu";
            await startConversation(client, user);
        }
    
        if(user.currentState === "menu") {
            await sendMenu(client, user);
        }
    
        DataBase.updateUser(id, user);
        const GRUPO_ADM = "120363370058127166@g.us";
        await admUserLog(client, GRUPO_ADM);
        console.log(DataBase.getAllUsers())
    }
}

async function admUserLog(api: Client, target: string) {
    
    const users = DataBase.getAllUsers();

    for(const user of users) {

        switch(user.currentState) {

            case "waiting_for_assistance": 
               // await api.sendMessage(target, `CHAMANDO ATENDENTE: \n \n O cliente ${user.name} esta aguardando uma resposta da assistencia`);
                break;

            case "on_request": 
              //n  await api.sendMessage(target, `REALIZANDO PEDIDO: \n \n O cliente ${user.name} esta realizando um pedido`);
                break;
                

        }
       
    }
}