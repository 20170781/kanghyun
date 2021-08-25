const path = require('path');

const { createFilePath } = require(`gatsby-source-filesystem`);

// Setup Import Alias
exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  const output = getConfig().output || {};

  actions.setWebpackConfig({
    output,
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        utils: path.resolve(__dirname, 'src/utils'),
        hooks: path.resolve(__dirname, 'src/hooks'),
      },
    },
  });
};

// Generate a Slug Each Post Data
// onCreateNode: 새 노드 생성될 때마다 호출되는 Gatsby 수명 메서드
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    // gatsby-source-filesystem 파일 경로를 URL로 변환
    const slug = createFilePath({ node, getNode });

    createNodeField({ node, name: 'slug', value: `/blog${slug}` });
  }
};

// Generate Post Page Through Markdown Data
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  // Get All Markdown File For Paging
  const queryAllMarkdownData = await graphql(
    `
      {
        postsRemark: allMarkdownRemark(
          sort: {
            order: DESC
            fields: [frontmatter___date, frontmatter___title]
          }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                categories
              }
            }
          }
        }
        postsByTag: allMarkdownRemark(
          sort: {
            order: DESC
            fields: [frontmatter___date, frontmatter___title]
          }
        ) {
          group(field: frontmatter___categories) {
            fieldValue
          }
        }
      }
    `,
  );

  // Handling GraphQL Query Error
  if (queryAllMarkdownData.errors) {
    reporter.panicOnBuild(`Error while running query`);
  }

  // Import Post Template Component
  const PostTemplateComponent = path.resolve(
    __dirname,
    'src/page_template/post_template.tsx',
  );

  const BlogTemplateComponent = path.resolve(
    __dirname,
    'src/page_template/blog_template.tsx',
  );

  // Page Generating Function
  const generatePostPage = ({
    node: {
      fields: { slug },
    },
  }) => {
    createPage({
      path: slug,
      component: PostTemplateComponent,
      context: { slug },
    });
  };

  const generateBlogPageByTag = ({ fieldValue }) => {
    createPage({
      path: `/blog/${fieldValue}`,
      component: BlogTemplateComponent,
      context: { fieldValue },
    });
  };

  const generateBlogPage = () => {
    createPage({
      path: `/blog`,
      component: BlogTemplateComponent,
      context: 'blog',
    });
  };

  // Generate Post Page And Passing Slug Props for Query
  queryAllMarkdownData.data.postsRemark.edges.forEach(generatePostPage);
  queryAllMarkdownData.data.postsByTag.group.forEach(generateBlogPageByTag);
  generateBlogPage();
};
