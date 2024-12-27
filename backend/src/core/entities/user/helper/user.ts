export class UserLib {
    static generateAuthId = () => {
        return Math.random().toString(10).slice(2)
    };
}
