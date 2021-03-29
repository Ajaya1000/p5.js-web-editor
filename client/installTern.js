// adapted from github.com/wonderstudio/src/editor/installTern.js
import CodeMirror from 'codemirror';
// import 'tern';
// import 'codemirror/addon/tern/tern';
// eslint-disable-next-line import/no-webpack-loader-syntax
import 'imports-loader?tern=tern!codemirror/addon/tern/tern';
import 'tern/plugin/doc_comment';
import 'tern/plugin/complete_strings';

import ecma from 'tern/defs/ecmascript.json';
import browser from 'tern/defs/browser.json';

function TernServer(cm) {
  const tern = new CodeMirror.TernServer({ defs: [ecma, browser] });
  cm.setOption('extraKeys', {
    'Ctrl-Space': (_cm) => tern.complete(_cm),
    'Ctrl-I': (_cm) => tern.showType(_cm),
    'Ctrl-O': (_cm) => tern.showDocs(_cm),
    'Alt-.': (_cm) => tern.jumpToDef(_cm),
    'Alt-,': (_cm) => tern.jumpBack(_cm),
    'Ctrl-Q': (_cm) => tern.rename(_cm),
    'Ctrl-.': (_cm) => tern.selectName(_cm)
  });
  cm.on('cursorActivity', (_cm) => tern.updateArgHints(_cm));
  cm.on('change', (_cm, change) => {
    if (change.text.length !== 0 && change.text[0] === '.') {
      console.log(_cm);
      tern.complete(_cm);
    }
  });
  return tern;
}
export default TernServer;
