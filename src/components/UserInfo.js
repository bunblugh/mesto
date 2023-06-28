export class UserInfo {
    constructor(profileName, profileDescription) {
        this._username = profileName;
        this._about = profileDescription;
    }

    getUserInfo() {
        return {
            username: this._username.textContent,
            about: this._about.textContent
        }
    }

    setUserInfo(userData) {
        this._username.textContent = userData.username;
        this._about.textContent = userData.about;
    }
}