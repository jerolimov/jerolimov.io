import { useMemo } from 'react';

import { PrismLight } from 'react-syntax-highlighter';

import diff from 'react-syntax-highlighter/dist/cjs/languages/prism/diff';
import java from 'react-syntax-highlighter/dist/cjs/languages/prism/java';
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import json5 from 'react-syntax-highlighter/dist/cjs/languages/prism/json5';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import yaml from 'react-syntax-highlighter/dist/cjs/languages/prism/yaml';

import style from 'react-syntax-highlighter/dist/cjs/styles/prism/prism';
// import style from 'react-syntax-highlighter/dist/cjs/styles/prism/synthwave84';
// import style from 'react-syntax-highlighter/dist/cjs/styles/prism/xonokai';

PrismLight.registerLanguage('diff', diff);
PrismLight.registerLanguage('java', java);
PrismLight.registerLanguage('javascript', javascript);
PrismLight.registerLanguage('json', json);
PrismLight.registerLanguage('json5', json5);
PrismLight.registerLanguage('tsx', tsx);
PrismLight.registerLanguage('typescript', typescript);
PrismLight.registerLanguage('yaml', yaml);

type SyntaxHighlighterProps = {
  children: string
  language?: string
  metastring?: string
  className?: string
}

export default function SyntaxHighlighter(props: SyntaxHighlighterProps) {
  // console.log('SyntaxHighlighter props', props);

  const code = props.children.trimEnd();
  const language = props.language || props.className?.replace(/language-/, '');
  const metastring = props.metastring;

  // console.log('metastring' + props.metastring);

  const lineProps = useMemo<(lineNumber: number) => React.HTMLProps<HTMLElement> | undefined>(() => {
    // supported 'line highlight' format: {1,2,4-5}
    if (metastring && metastring.startsWith('{') && metastring.endsWith('}')) {
      const highlightLinesString = metastring.substring(1, metastring.length - 1);
      const highlightLines = highlightLinesString.split(',').map(s => {
        if (s.includes('-')) {
          const from = parseInt(s.substring(0, s.length));
          const to = parseInt(s.substring(0, s.length));
          return { from, to }
        } else {
          const from = parseInt(s);
          return { from, to: from }
        }
      }).filter(({ from, to }) => !isNaN(from) && !isNaN(to));

      return (lineNumber: number) => {
        if (highlightLines.some(({ from, to }) => lineNumber >= from && lineNumber <= to)) {
          return {
            style: {
              display: 'flex',
              backgroundColor: '#fffbdd',
            },
          }
        } else {
          return {}
        }
      };
    }

    if (language === 'diff') {
      const lines = code.split('\n');
      return (lineNumber: number) => {
        const line = lines[lineNumber - 1];
        if (line.startsWith('+') || line.startsWith('-')) {
          return {
            style: {
              display: 'flex',
              backgroundColor: line.startsWith('+') ? '#dbffdb' : '#ffecec',
            },
          }
        } else {
          return {};
        }
      };
    }

    return undefined;
  }, [code, metastring]);

  return (
    <PrismLight
      children={code}
      language={language}
      wrapLines
      showLineNumbers
      wrapLongLines
      lineProps={lineProps}
      style={style}
    />
  );
}