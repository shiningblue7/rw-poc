import PostsLayout from 'src/layouts/PostsLayout'
import PostsCell from 'src/components/PostsCell'
import StandardLayout from 'src/layouts/StandardLayout/StandardLayout'

const PostsPage = () => {
  return (
    <StandardLayout>
      <PostsLayout>
        <PostsCell />
      </PostsLayout>
    </StandardLayout>
  )
}

export default PostsPage
