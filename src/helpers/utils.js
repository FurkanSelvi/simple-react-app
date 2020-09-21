export const generateToken = () => {
    return Math.random().toString(36).substr(2, 10);
}