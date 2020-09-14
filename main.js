import { createElement, Component, render } from './toy-react.js';

class MyComponent extends Component {
  render() {
    return <div>
      <h1>my component</h1>
      {this.children}
    </div>
  }
}



render(<MyComponent>
  <div id="a" class="c">
    <p>this is p</p>
  </div>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</MyComponent>, document.body)
