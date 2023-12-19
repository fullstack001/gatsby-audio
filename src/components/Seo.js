import React from "react"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"
import { useStaticQuery, graphql } from "gatsby"
import { helmetJsonLdProp } from "react-schemaorg"

const Seo = ({
  lang,
  homePage,
  title,
  author,
  description,
  image,
  date,
  children,
}) => {
  const { pathname } = useLocation()

  const { site } = useStaticQuery(graphql`
    query SEO {
      site {
        siteMetadata {
          siteTitle: title
          titleTemplate
          siteDescription: description
          siteUrl
          defaultImage: cover
          twitterUsername
          siteLanguage
        }
      }
    }
  `)
  // const metaDescription = description || site.siteMetadata.description
  const {
    siteTitle,
    titleTemplate,
    siteDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
    siteLanguage,
  } = site.siteMetadata

  const seo = {
    title: title || siteTitle,
    description: description || siteDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
    canonical: pathname ? `${siteUrl}${pathname}` : null,
    twitterUsername: twitterUsername,
  }

  // Structured Data / JSON-lD

  const scripts = []

  // JSON-LD for home page
  if (homePage) {
    const websiteJsonLd = helmetJsonLdProp({
      "@context": "https://schema.org",
      "@type": "WebSite",
      publisher: {
        "@type": "Organization",
        name: title || siteTitle,
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: "https://arun.gbjsolution.com/content/images/2021/05/arun-light-theme-logo.svg",
        },
      },
      url: seo.url,
      image: {
        "@type": "ImageObject",
        url: `${siteUrl}${image || defaultImage}`,
        width: 1300,
        height: 1625,
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": siteUrl,
      },
      description:
        "An architect, software developer, YouTuber and keynote speaker. On this site I write about my learning and experience.",
    })
    scripts.push(websiteJsonLd)
  }

  // JSON-LD for posts and other pages
  if (title && author) {
    const articleJsonLd = helmetJsonLdProp({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      image: `${siteUrl}${image}`,
      datePublished: date,
      author: {
        "@type": "Person",
        name: `${author.name}`,
        url: `/author${author.fields.slug}`,
      },
    })
    scripts.push(articleJsonLd)
  }

  return (
    <Helmet
      htmlAttributes={{
        lang: siteLanguage,
      }}
      title={seo.title}
      titleTemplate={titleTemplate}
      link={
        seo.canonical
          ? [
              {
                rel: "canonical",
                href: seo.canonical,
              },
            ]
          : []
      }
      meta={[
        {
          name: "title",
          content: seo.title,
        },
        {
          name: "description",
          content: seo.description,
        },
        {
          name: "image",
          content: seo.image,
        },
        {
          property: "og:url",
          content: seo.url,
        },
        {
          property: "og:title",
          content: seo.title,
        },
        {
          property: "og:description",
          content: seo.description,
        },
        {
          property: "og:image",
          content: seo.image,
        },
        {
          property: "twitter:card",
          content: "summary_large_image",
        },
        {
          property: "twitter:creator",
          content: seo.twitterUsername,
        },
        {
          property: "twitter:title",
          content: seo.title,
        },
        {
          property: "twitter:description",
          content: seo.description,
        },
        {
          property: "twitter:image",
          content: seo.image,
        },
      ]}
      script={scripts}
    >
      {children}
    </Helmet>
  )
}

export default Seo

// const query = graphql`
//   query {
//     site {
//       siteMetadata {
//         siteTitle: title
//         titleTemplate
//         description
//         siteUrl
//         defaultImage: image
//         twitterUsername
//       }
//     }
//   }
// `

// Seo.defaultProps = {
//   lang: "en",
//   title: null,
//   // description: null,
//   // meta: [],
//   // image: null,
//   // article: false,
// }

// <Helmet title={seo.title} titleTemplate={titleTemplate}>
//   <meta name="description" content={seo.description} />
//   <meta name="image" content={seo.image} />
//   {seo.url && <meta property="og:url" content={seo.url} />}
//   {(article ? true : null) && <meta property="og:type" content="article" />}
//   {seo.title && <meta property="og:title" content={seo.title} />}
//   {seo.description && (
//     <meta property="og:description" content={seo.description} />
//   )}
//   {seo.image && <meta property="og:image" content={seo.image} />}
//   <meta name="twitter:card" content="summary_large_image" />
//   {twitterUsername && (
//     <meta name="twitter:creator" content={twitterUsername} />
//   )}
//   {seo.title && <meta name="twitter:title" content={seo.title} />}
//   {seo.description && (
//     <meta name="twitter:description" content={seo.description} />
//   )}
//   {seo.image && <meta name="twitter:image" content={seo.image} />}
// </Helmet>
