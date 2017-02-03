export var GENDER = {
	MALE: 0,
	FEMALE: 1,
	UNSPECIFIED: 2
};

export class UserInfo {

    nickname;
    gender;

    constructor(nickname, gender) {

    	this.nickname = nickname;
    	this.gender = gender;

    }

}

export class User {

    userID;
    userInfo;
    userLocation;

    constructor(userID, userInfo, userLocation) {

    	this.userID = userID;
    	this.userInfo = userInfo;
    	this.userLocation = userLocation;

    }

}