import React, { FC } from 'react';
import styled from '@emotion/styled';

interface MarkdownType {
  html: string;
}

const MarkdownRenderer = styled.div`
  // Renderer Style
  display: flex;
  flex-direction: column;
  width: 75%;
  margin: 0 auto;
  padding-top: 100px;
  word-break: break-all;

  // Markdown Style
  line-height: 1.7;
  font-size: 1.1rem;
  font-weight: 400;
  letter-spacing: -0.004rem;

  // Apply Padding Attribute to All Elements
  p {
    padding: 3px 0;
  }

  // Adjust Heading Element Style
  h1,
  h2,
  h3,
  h4 {
    font-weight: 800;
    margin-bottom: 1.75rem;
  }

  * + h1,
  * + h2,
  * + h3,
  * + h4 {
    margin-top: 3rem;
  }

  hr + h1,
  hr + h2,
  hr + h3,
  hr + h4 {
    margin-top: 0;
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.5rem;
  }

  h4 {
    font-size: 1.2rem;
  }

  img {
    width: 50%;
    display: block;
    margin: 0px auto;
  }

  // Adjust Quotation Element Style
  blockquote {
    margin: 30px 0;
    padding: 5px 15px;
    border-left: 2px solid #000000;
    font-weight: 800;
  }

  // Adjust List Element Style
  ol,
  ul {
    margin-left: 20px;
    padding: 30px 0;
  }

  // Adjust Horizontal Rule style
  hr {
    border: 1px solid #000000;
    margin: 100px 0;
  }

  // Adjust Link Element Style
  a {
    color: #4263eb;
    text-decoration: underline;
  }

  // Adjust Code Style
  pre[class*='language-'] {
    margin: 30px 0;
    padding: 15px;
    font-size: 15px;

    ::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.5);
      border-radius: 3px;
    }
  }

  code[class*='language-'],
  pre[class*='language-'] {
    tab-size: 2;
  }

  // Markdown Responsive Design
  @media (max-width: 828px) {
    width: 100%;
    padding: 5rem 1rem;
    line-height: 1.6;
    font-size: 1rem;

    h1 {
      font-size: 1.75rem;
    }

    h2 {
      font-size: 1.5rem;
    }

    h3 {
      font-size: 1.25rem;
    }

    h4 {
      font-size: 1.1rem;
    }

    img {
      width: 100%;
    }

    hr {
      margin: 50px 0;
    }
  }
`;

const Markdown: FC<MarkdownType> = ({ html }) => {
  return <MarkdownRenderer dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Markdown;
