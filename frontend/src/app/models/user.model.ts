class	friend
{
	_id?: string;
	login?: string;
	family?: string;
	food?: string;
	age?: number;
	color?: string;
}

export class User {
	_id?: string;
	login?: string;
	family?: string;
	race?: string;
	color?: string;
	food?: string;
	age?: number;
	friends?: friend[];
	exp?: number;
	iat?: number;
  }