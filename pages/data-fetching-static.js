import Layout from '../components/layout';

export async function getStaticProps() {

  const res = await fetch(`http://worldclockapi.com/api/json/utc/now`)
  const data = await res.json()

  return {
    props: {
      data,
    },
  };
}

export default function DataFetching({ data }) {
  return (
    <Layout>
      <h1>Data Fetching: Static</h1>
      <p>{data.currentDateTime}</p>
      <p>{data.currentFileTime}</p>
    </Layout>
  )
}
