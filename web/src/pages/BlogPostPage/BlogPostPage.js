import StandardLayout from 'src/layouts/StandardLayout'
import BlogPostCell from 'src/components/BlogPostCell'

const BlogPostPage = ({id}) => {
  return (
    <StandardLayout>
      <BlogPostCell id={id} />
    </StandardLayout>
  )
}

export default BlogPostPage