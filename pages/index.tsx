import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Date from '../components/date';
import { signIn, signOut, useSession } from 'next-auth/react';
import jwt_decode from "jwt-decode";
import { GetStaticProps } from 'next';

// getStaticProps only runs on the server-side.
export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ 
  allPostsData 
}: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return "Loading or not authenticated..."
  }

  if (session && session.user) {
    console.log("Signed in!", session)
    var decoded_id_token = jwt_decode(session.idToken);
    console.log("Decoded JWT ID Token: ", decoded_id_token);
    return (
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>

        <section className={utilStyles.headingMd}>
          <p>Signed in as {session.user.name} ({session.user.email})</p>
          <h3 className={utilStyles.headingLg}>User attributes managed in DynamoDB and provided by pre token generator</h3>
          <ul>
          <li>email: {decoded_id_token.email}</li>
          <li>Tenant ID: {decoded_id_token.tenant_id}</li>
          <li>Role: {decoded_id_token.role}</li>
          </ul>
          <h3 className={utilStyles.headingLg}>User custom attributes managed and provided by Cognito</h3>
          <p>custom:role: {'decoded_id_token.custom:role'}</p>
          <p>Test <Link href="/root">Root</Link></p>
          <p>Test <Link href="/child">Child</Link></p>
          <p>Test <Link href="/data-fetching-ssr">getServerSideProps</Link></p>
          <p>Test <Link href="/data-fetching-static">getStaticProps</Link></p>
          <button onClick={() => signOut({ callbackUrl: "signOut" })}>Sign out</button>
        </section>

        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Blog</h2>
          <ul className={utilStyles.list}>
            {allPostsData.map(({ id, date, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>{title}</Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            ))}
          </ul>
        </section>
      </Layout>
    );
  }
  return (
    <Layout home>
    <section className={utilStyles.headingMd}>
      <p>Welcome to my demo.</p>
      <div>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    </section>
    </Layout>
  );
}
