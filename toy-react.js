const RENDER_TO_DOM = Symbol('render_to_dom');

class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type);
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }
  appendChild(component) {
    let range = document.createRange();
    range.setStart(this.root, this.root.childNodes.length);
    range.setEnd(this.root, this.root.childNodes.length);
    component[RENDER_TO_DOM](range);
  }
  [RENDER_TO_DOM](range) {
    range.deleteContents();
    range.insertNode(this.root);
  }
}

class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content);
  }
  [RENDER_TO_DOM](range) {
    range.deleteContents();
    range.insertNode(this.root);
  }
  // setAttribute(name, value) {}
  // appendChild() {}
}

export class Component {
  constructor(content) {
    this.props = Object.create(null);
    this.children = [];
    this._root = null;
  }
  setAttribute(name, value) {
    this.props[name] = value;
  }
  appendChild(component) {
    this.children.push(component);
  }
  [RENDER_TO_DOM](range) {
    this.render().[RENDER_TO_DOM](range);
  }
 /*  get root() {
    if (!this._root) {
      this._root = this.render().root;
    }
    return this._root;
  } */
}

export function createElement(type, attributes, ...children) {
  let el;
  if (typeof type === 'string') {
    el = new ElementWrapper(type);
  } else {
    el = new type;
  }

  for (let p in attributes) {
    el.setAttribute(p, attributes[p]);
  } 
  let insertChildren = (children) => {
    for (let child of children) {
      if (typeof child === 'string') {
        child = new TextWrapper(child);
      }

      if (typeof child === 'object' && child instanceof Array) {
         insertChildren(child);
      } else {
        el.appendChild(child);
      }
    }
    
  }
  insertChildren(children);
  return el;
}

export function render(component, parentElement) {
  let range = document.createRange();
  range.setStart(parentElement, 0);
  range.setEnd(parentElement, parentElement.childNodes.length);
  range.deleteContents();

  // parentElement.appendChild(component.root);
  component[RENDER_TO_DOM](range);
}
