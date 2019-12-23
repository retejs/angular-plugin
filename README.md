Angular Render (experimental)
====
#### Rete.js plugin

```ts
import { AngularRenderPlugin } from 'rete-angular-render-plugin';

editor.use(AngularRenderPlugin);
```

Import ReteModule
```ts
import { ReteModule } from 'rete-angular-render-plugin';

@NgModule({
  imports: [ReteModule]
})
export class AppModule {}
```

Examples
---

- [Codesandbox](https://codesandbox.io/s/retejs-angular-render-v29f9)


Control
---

```ts
import { AngularControl } from 'rete-angular-render-plugin';

export class NumControl extends Control implements AngularControl {
  component: Type<ControlComponent>
  props: {[key: string]: unknown}
  
  constructor(key) {
    super(key);
    
    this.component = ControlComponent;
    this.props = // key-value
// ...
```

Custom node
---

Extend node component
```ts
import { NodeComponent, NodeService } from 'rete-angular-render-plugin';

@Component({
  templateUrl: './node.component.html', // copy template from src/node
  styleUrls: ['./node.component.sass'], // copy styles from src/node
  providers: [NodeService]
})
export class MyNodeComponent extends NodeComponent {
  constructor(protected service: NodeService) {
    super(service);
  }
}
```

Add component to `entryComponents` of your module
```ts
@NgModule({
  entryComponents: [MyNodeComponent]
})
export class AppModule {}
```

Custom component for all nodes
```ts
editor.use(AngularRenderPlugin, { component: MyNodeComponent });
```

Custom component for specific node
```ts
import { Component } from 'rete';
import { AngularComponent, AngularComponentData } from 'rete-angular-render-plugin';

export class AddComponent extends Component implements AngularComponent {
  data: AngularComponentData;

  constructor() {
    super('Add');
    this.data.render = 'angular';
    this.data.component = MyNodeComponent;
  }
// ...
```

