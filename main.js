import { createElement, Component, render as renderTmp } from './toy-react.js';

class MyComponent extends Component {
  constructor() {
    super();
    this.state ={
      a:1,
      b:2
    }
  }
  render() {
    return <div>
      <h1>my component</h1>
      <span>{this.state.a.toString()}  </span>
      {this.children}
    </div>
  }
}


renderTmp(<MyComponent>
  <div id="a" class="c">
    <p>this is p</p>
  </div>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</MyComponent>, document.body)
