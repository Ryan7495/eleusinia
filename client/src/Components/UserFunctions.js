import axios from 'axios';

export const register = newUser => {
	return axios	//TODO: fix file
		.post('http://localhost:1337/register', 
		{
			firstname: newUser.firstname,
			lastname: newUser.lastname,
			email: newUser.email,
			passcode: newUser.passcode
		})
		.then(res => { console.log('sending POST data to server') })
}

export const login = user => {
	return axios
		.post('http://localhost:1337/login', 
		{
			email: user.email,
			passcode: user.passcode
		})
		
}