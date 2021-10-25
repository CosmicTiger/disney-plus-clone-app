import { CMS_URL, GRAPH_QL_TOKEN } from '../../utils/constants.util';
import { gql, GraphQLClient } from 'graphql-request'

export const getServerSideProps = async (pageContext) => {
    const graphQLClient = new GraphQLClient(CMS_URL, {
        headers: {
            "Authorization": GRAPH_QL_TOKEN
        }
    })

    const pageSlug = pageContext.query.slug

    const query = gql`
        query ($pageSlug: String!){
            video(where: {
                slug: $pageSlug,
            }) {
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

    const variables = {
        pageSlug,
    }

    const data = await graphQLClient.request(query, variables)
    const { video } = data

    return {
        props: {
            video
        }
    }
}

const Video = (props) => {
    const { video } = props

    console.log(video)

    return (
        <div>
            Video
        </div>
    )
}

export default Video
