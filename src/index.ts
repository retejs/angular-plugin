import { Type } from '@angular/core';
import { NodeEditor } from 'rete';
import { AngularControl, ElementProps, AngularComponentData } from './types';
import { NodeComponent } from './node/node.component';

function install(editor: NodeEditor, params : { component?: Type<any> } = {}) {
    editor.on('rendernode', ({ el, node, component, bindControl, bindSocket }) => {
        const ngComponent = component as unknown as AngularComponentData;

        if (ngComponent.render && ngComponent.render !== 'angular') return;

        const element = document.createElement('rete-element');
        const props: ElementProps = element as any;

        props.component = ngComponent.component || params.component || NodeComponent;
        props.props = Object.assign({}, ngComponent.props || {}, {
            node,
            editor,
            bindControl,
            bindSocket
        });

        el.appendChild(element);
    });

    editor.on('rendercontrol', ({ el, control }) => {
        const ngControl = control as unknown as AngularControl;

        if (ngControl.render && ngControl.render !== 'angular') return;

        const element = document.createElement('rete-element');
        const props: ElementProps = element as any;

        props.component = ngControl.component;
        props.props = ngControl.props;

        el.appendChild(element);
    });
    editor.on(['connectioncreated', 'connectionremoved'], connection => {
        connection.output.node.update();
        connection.input.node.update();
    });
    editor.on('nodeselected', () => {
        editor.nodes.forEach(n => n.update());
    });
}

export const AngularRenderPlugin = {
    name: 'angular-render',
    install
};
export { ReteModule } from './module';
export * from './types';
export { NodeService } from './node.service';
export { NodeComponent } from './node/node.component';
export { SocketComponent } from './socket/socket.component';
export { KebabPipe } from './kebab.pipe';
export { ControlDirective } from './control.directive';
export { SocketDirective } from './socket.directive';
export { CustomComponent } from './custom.component';
