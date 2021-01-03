import { PrismLight } from 'react-syntax-highlighter';
import style from 'react-syntax-highlighter/dist/cjs/styles/prism/material-light';

type SyntaxHighlighterProps = {
  children: string
  language?: string
  className?: string
}

export default function SyntaxHighlighter(props: SyntaxHighlighterProps) {
  const language = props.language || props.className?.replace(/language-/, '');
  return (
    <PrismLight
      {...props}
      language={language}
      style={style}
    />
  );
}