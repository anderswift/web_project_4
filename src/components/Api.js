export class Api {

  constructor({ baseUrl, headers }) {
    this._baseUrl= baseUrl;
    this._headers= headers;
  }
  
  getInitialCards(handleCards) {
    return fetch(this._baseUrl+'cards/', {
      headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json();
      } 
      return Promise.reject(`Error: ${res.status}`);
    }).then((cardData) => {
      handleCards(cardData);
    }).catch((err) => {
      console.log(err);
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

