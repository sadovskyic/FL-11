let user = {
        email: 'user@gmail.com',
        password: 'UserPass'
    },
    admin = {
        email: 'admin@gmail.com',
        password: 'AdminPass'
    },
    unknown = {
        message: 'I don’t know you'
    };
let users = [user, admin, unknown];
let minEmailSymbols = 6;
let minPassSymbols = 5;
let enteredEmail = prompt('Enter your email');
if (enteredEmail === '' || enteredEmail === null) {
    alert('Canceled');
} else if (enteredEmail.length < minEmailSymbols) {
    alert('I don\'t know any emails having name length less than 6 symbols');
} else {
    for (let i = 0; i < users.length; i++) {
        if (users[i] === unknown) {
            alert(users[i].message);
            continue;
        }
        if (users[i].email === enteredEmail) {
            let enteredPass = prompt('Enter your password');
            if (enteredPass === '' || enteredPass === null) {
                alert('Canceled');
            } else if (enteredPass !== users[i].password) {
                alert('Wrong password');
            } else {
                if (!confirm('Do you want to change your password?')) {
                    alert('You have failed the change.');
                } else {
                    enteredPass = prompt('Enter your old password');
                    if (enteredPass !== users[i].password) {
                        alert('Wrong password');
                    } else {
                        let newPass = prompt('Enter new password');
                        if (newPass.length < minPassSymbols) {
                            alert('It’s too short password. Sorry.');
                        } else {
                            if (newPass !== prompt('Confirm new password')) {
                                alert('You wrote the wrong password.');
                            } else {
                                alert('You have successfully changed your password.');
                            }
                        }
                    }
                }
            }
            break;
        }
    }
}