import { NodeEditor } from 'rete';
function install(editor: NodeEditor) {
    editor.on('rendernode', ({ el }) => {
        const element = document.createElement('rete-node');
        el.appendChild(element);
    });
}

export default {
    name: 'angular-render',
    install
}

export { ReteModule } from './module';
