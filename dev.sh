# npm run build && cd dist && npm pack && mv rete-angular-render-plugin-2.0.0-beta.1.tgz .. && cd .. && npm i --prefix ../playground-angular rete-angular-render-plugin-2.0.0-beta.1.tgz -f
# DEST=../playground-angular/node_modules/rete-angular-render-plugin npm run build:dev

nodemon --watch src --ext ts,html,sass --exec "npm run build && cd dist && npm pack && mv rete-angular-render-plugin-2.0.0-beta.1.tgz .. && cd .. && npm i --prefix ../playground-angular rete-angular-render-plugin-2.0.0-beta.1.tgz -f"
