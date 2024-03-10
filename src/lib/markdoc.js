import { parse, render } from '@markdoc/markdoc';

export function renderMarkdown(markdown) {
  const ast = parse(markdown);
  return render(ast);
}