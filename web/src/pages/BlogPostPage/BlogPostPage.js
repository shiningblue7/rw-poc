import StandardLayout from 'src/layouts/StandardLayout'
import BlogPostCell from 'src/components/BlogPostCell'

const BlogPostPage = ({id}) => {
  return (
    <>
      <BlogPostCell id={id} />
    </>
  )
}

export default BlogPostPage