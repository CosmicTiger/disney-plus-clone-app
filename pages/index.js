import { CMS_URL, GRAPH_QL_TOKEN } from '../utils/constants.util';
import { gql, GraphQLClient } from 'graphql-request'

export const getStaticProps = async () => {
  const graphQLClient = new GraphQLClient(CMS_URL, {
    headers: {
      "Authorization": GRAPH_QL_TOKEN
    }
  })

  const query = gql`
    query {
      videos {
        createdAt
        id,
        title,
        description,
        seen,
        slug,
        tags,
        thumbnail {
          url
        },
        mp4 {
          url
        }
      }
    }
  `

  const data = await graphQLClient.request(query)
  const { videos } = data

  return {
    props: {
      videos,
    }
  }
}

const Home = (props) => {
  const { videos } = props

  console.log(videos)

  return (
    <div>
      Hello
    </div>
  )
}

export default Home
