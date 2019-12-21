import {NodeEditor} from 'rete';
import {Type} from '@angular/core';
import {AngularComponentData, AngularControl, ElementProps} from './types';
import {NodeComponent} from './components/node/node.component';
import {Plugin} from 'rete/types/core/plugin';

export const AngularRenderPlugin: Plugin = {
  name: 'angular-render',
  install: (editor: NodeEditor, params: { component?: Type<any> } = {}) => {
    editor.on('rendernode', ({el, node, component, bindControl, bindSocket}) => {
      const ngComponent = component as unknown as AngularComponentData;

      if (ngComponent.render && ngComponent.render !== 'angular') {
        return;
      }

      const element = document.createElement('rete-element');
      const props: ElementProps = element as any;

      props.component = ngComponent.component || params.component || NodeComponent;
      props.props = Object.assign(ngComponent.props || {}, {
        node,
        editor,
        bindControl,
        bindSocket
      });

      el.appendChild(element);
    });

    editor.on('rendercontrol', ({el, control}) => {
      const ngControl = control as unknown as AngularControl;

      if (ngControl.render && ngControl.render !== 'angular') {
        return;
      }

      const element = document.createElement('rete-element');
      const props: ElementProps = element as any;

      props.component = ngControl.component;
      props.props = ngControl.props;

      el.appendChild(element);
    });
  }
};
