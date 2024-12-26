export class UserLib {
    static generateAuthId = () => {
        return Math.random().toString(36).substring(15, 15);
    };
}
