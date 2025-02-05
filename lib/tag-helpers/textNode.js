import normalizeWhitespace from 'normalize-html-whitespace';
import he from 'he';

export const textNode = (tag, context) => {
  if (context.pre) {
    return {
      pre: null,
      value: tag.value,
      post: null,
      type: "inline",
      nodeName: "#text",
    };
  }
  const normalized = context.pre
    ? tag.value.split('')
    : normalizeWhitespace(tag.value)
      .replace(/\n/g, ' ')
      .split('');

  const pre = [' ', '\n'].includes(normalized[0]) ? normalized.shift() : null;
  const post = [' ', '\n'].includes(normalized[normalized.length - 1]) ? normalized.pop() : null;

  return {
    pre,
    value: normalized.length > 0 ? `${he.decode(normalized.join(""))}` : null,
    post,
    type: "inline",
    nodeName: "#text",
  };
};
