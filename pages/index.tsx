import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import { getRecentLinks } from '../lib/links'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getSortedPostsData()
  const recentLinksData = await getRecentLinks()
  console.log('static props: ', recentLinksData)
  return {
    props: {
      allPostsData,
      recentLinksData
    }
  }
}

export default function Home({
  allPostsData,
  recentLinksData
}: {
  recentLinksData: any,
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Below you'll find some links that I have recently found interesting.{' '}
          Many of them are related to software engineering because that's what{' '}
          I do for a living. Find me on <Link href='https://github.com/agillette'>Github</Link>.
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Recently Bookmarked</h2>
        <ul className={utilStyles.list}>
        {recentLinksData.map(link => (
          <li className={utilStyles.listItem} key={link.id}>
            <Link href={link.url}>{link.title}</Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={link.date} />
            </small>
          </li>
        ))}
        </ul>
      </section>
    </Layout>
  )
}
