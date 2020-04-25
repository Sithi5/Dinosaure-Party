class	friend
{
	_id?: string;
	login?: string;
	family?: string;
	food?: string;
	age?: number;
}

export class User {
	_id?: string;
	login?: string;
	family?: string;
	food?: string;
	age?: number;
	friends?: friend[];
	exp?: number;
	iat?: number;
  }