import PostsLayout from 'src/layouts/PostsLayout'
import EditPostCell from 'src/components/EditPostCell'
import StandardLayout from 'src/layouts/StandardLayout'
const EditPostPage = ({ id }) => {
  return (
    <>
    <PostsLayout>
      <EditPostCell id={id} />
    </PostsLayout>
    </>
  )
}

export default EditPostPage
