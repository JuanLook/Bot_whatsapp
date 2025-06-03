export interface UserData {
    currentState: 'menu' | 'in_conversation' | 'other';
    name: string;
    lastInteractionDate: Date | null;
    id: string;
    hasStartedConversation: boolean;
    message: string;
   
}

export default class DataBase {
   
    private static users: Map<string, UserData> = new Map();

    public static addUser(user: UserData): void {

        if(!this.users.has(user.id)) {
            this.users.set(user.id, user);
        }
    }

    public static exist(user: UserData) {
        return this.users.has(user.id);
    }

    public static getUserById(id: string): UserData | undefined {
        return this.users.get(id);
    }

    public static updateUser(id: string, updatedUser: UserData): boolean {
        if (this.users.has(id)) {
            this.users.set(id, updatedUser);
            return true;
        }
        return false;
    }

    public static removeUser(id: string): boolean {
        return this.users.delete(id);
    }

    public static getAllUsers(): UserData[] {
        return Array.from(this.users.values());
    }
}
