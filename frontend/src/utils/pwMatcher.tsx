export const passwordMismatch = (pass1: string, pass2:string) => { //pass1 === password and pass2 ===confirmPassword
    if (pass2 !== pass1) {
        return true;
    } else {
        return false;
    }
}