import PostsLayout from 'src/layouts/PostsLayout'
import NewPost from 'src/components/NewPost'
import StandardLayout from 'src/layouts/StandardLayout'

const NewPostPage = () => {
  return (
    <StandardLayout>
    <PostsLayout>
      <NewPost />
    </PostsLayout>
    </StandardLayout>
  )
}

export default NewPostPage
