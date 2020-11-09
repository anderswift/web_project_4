export class Section {

  constructor({ items, renderer }, containerSelector) {
    this._items= items;
    this._renderer= renderer;

    this._container= document.querySelector(containerSelector);
  }


  addItem(item, prepend= true) {
    if (prepend) this._container.prepend(item);
	  else this._container.append(item);
  }
  

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item); 
    });
  }

}