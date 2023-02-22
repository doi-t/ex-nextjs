import Layout from '../components/layout';
import {
  DynamoDBClient,
  GetItemCommand,
} from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({
  region: 'ap-northeast-1' });

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://worldclockapi.com/api/json/utc/now`)
  const data = await res.json()

  // This value is considered fresh for ten seconds (s-maxage=10).
  // If a request is repeated within the next 10 seconds, the previously
  // cached value will still be fresh. If the request is repeated before 59 seconds,
  // the cached value will be stale but still render (stale-while-revalidate=59).
  //
  // In the background, a revalidation request will be made to populate the cache
  // with a fresh value. If you refresh the page, you will see the new value.
  // res.setHeader(
  //   'Cache-Control',
  //   'public, s-maxage=10, stale-while-revalidate=59'
  // )

  // DynamoDB
    const { Item } = await client.send(
      new GetItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          TenantId: { S: '0001' }
        }
      })
    );

  // Pass data to the page via props
  return { props: { data, Item } }
}

export default function DataFetching({ data, Item }) {
  return (
    <Layout>
      <h1>Data Fetching: SSR</h1>
      <p>{data.currentDateTime}</p>
      <p>{data.currentFileTime}</p>
      <p>{Item.TenantId.S}</p>
      <p>{Item.Domain.S}</p>
    </Layout>
  )
}
