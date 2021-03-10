import { Link, routes } from '@redwoodjs/router'
import StandardLayout from 'src/layouts/StandardLayout/StandardLayout'

const HomePage = () => {
  return <StandardLayout>
    Welcome to RW-POC
    This is the Homepage
    <div>Hello I now have markup</div>
    </StandardLayout>
}

export default HomePage
