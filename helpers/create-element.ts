export interface Node {
  elem: string;
  attributes?: any;
  text?: string;
  children: Node[];
}

export default function createElement(node: Node) {
  const attributes = Object.keys(node.attributes || {}).reduce((acc, key, index) => {
    return `${acc} ${key}="${node.attributes[key]}"`;
  }, '');

  if (!!node.children && !!node.text) {
    return `<${node.elem}${attributes} />`;
  }

  if (node.children) {
    let children = createElements(node.children);
    return `<${node.elem}${attributes}>${children} ${node.text || ''}</${node.elem}>`;
  }

  return `<${node.elem}${attributes}>${node.text || ''}</${node.elem}>`;
}

export function createElements(nodes: Node[]) {
  let output = '';
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    output = `${output} ${createElement(node)}`;
  }

  return output;
}
