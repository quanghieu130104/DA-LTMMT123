"use client"; // Render ở Client để xử lý Highlighting

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// Chọn theme màu code: dracula (tối/tím) rất hợp với Cyberpunk
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Props {
  content: string;
}

export default function MarkdownRenderer({ content }: Props) {
  return (
    <div className="prose prose-invert prose-lg max-w-none 
      /* Tùy chỉnh màu sắc cho các thẻ Markdown */
      prose-headings:text-purple-300 prose-headings:font-bold
      prose-a:text-pink-400 prose-a:no-underline hover:prose-a:text-pink-300
      prose-strong:text-white
      prose-blockquote:border-l-purple-500 prose-blockquote:bg-white/5 prose-blockquote:p-4 prose-blockquote:rounded-r-lg
      prose-code:text-purple-300 prose-code:bg-white/10 prose-code:rounded prose-code:px-1 prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-[#1e1e1e] prose-pre:border prose-pre:border-white/10
      prose-li:marker:text-purple-500
    ">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Xử lý custom cho thẻ code block
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                {...props}
                style={dracula} // Theme màu code
                language={match[1]}
                PreTag="div"
                className="rounded-xl !bg-[#1e1e1e] !my-0 shadow-lg border border-white/10"
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code {...props} className={className}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}