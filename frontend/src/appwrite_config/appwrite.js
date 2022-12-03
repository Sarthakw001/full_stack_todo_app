import {Client, Account} from 'appwrite';

const client = new Client().setEndpoint("http://localhost/v1").setProject('6386169ead2d5c665904');

export const account = new Account(client);

