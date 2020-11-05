export class Api {

  constructor({ baseUrl, headers }) {
    this._baseUrl= baseUrl;
    this._headers= headers;
  }
  
  getInitialCards() {
    return fetch(this._baseUrl + 'cards', {
      headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json();
      } 
      return Promise.reject(`Error: ${res.status}`);
    });
  } 

  getUserInfo() {
    return fetch(this._baseUrl + 'users/me', {
      headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json();
      } 
      return Promise.reject(`Error: ${res.status}`);
    });
  } 

  test() {
    return fetch(this._baseUrl + 'cards', {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: "Forest",
        link: "https://images.pexels.com/photos/2440061/pexels-photo-2440061.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      })
    }).then(res => {
      if (res.ok) {
        return res.json();
      } 
      return Promise.reject(`Error: ${res.status}`);
    });
    
    
  }


}




/**
 * Loading user information:
 * GET https://around.nomoreparties.co/v1/${groupId}/users/me 
 * 
 * Loading cards from server:
 * GET https://around.nomoreparties.co/v1/${groupId}/cards 
 * 
 * Editing user info
 * PATCH https://around.nomoreparties.co/v1/${groupId}/users/me 
 * 
 * Editing profile picture
 * PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar 
 * 
 * Adding new card
 * POST https://around.nomoreparties.co/v1/${groupId}/cards 
 * 
 * Delete a card
 * DELETE https://around.nomoreparties.co/v1/${groupId}/cards/${cardId} 
 * 
 */

