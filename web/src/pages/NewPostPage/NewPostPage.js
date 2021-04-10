import PostsLayout from 'src/layouts/PostsLayout'
import NewPost from 'src/components/NewPost'
import StandardLayout from 'src/layouts/StandardLayout'

const NewPostPage = () => {
  return (
    <>
    <PostsLayout>
      <NewPost />
    </PostsLayout>
    </>
  )
}

export default NewPostPage
