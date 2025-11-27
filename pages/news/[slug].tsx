import React, { useState } from "react";

import Globals from "@/modules/Globals";
import { GetStaticPaths, GetStaticProps } from "next";

import SpinnerComponent from "@/components/UI/SpinnerComponent";

import Link from "next/link";

import Head from "next/head";
import { useRouter } from "next/router";

import { Newsitem } from "@/models/newsitem";
import { AiOutlineRight } from "react-icons/ai";
import Image from "next/image";

function DetailPage({ pageData }: { pageData: Newsitem }) {
  const router = useRouter();
  const UrlPath = `https://arosarealestate.com${router.asPath.split("?")[0]}`;
  if (!pageData) {
    return <SpinnerComponent />;
  }

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "News", href: "/news" },
    { label: pageData.name.value, href: "#" },
  ];

  return (
    <div className="news-detail-wrapper bg-slate-50">
      <Head>
        <title>{pageData.metadataPagetitle.value}</title>

        {/* Canonical */}
        <link rel="canonical" href={UrlPath} />

        {/* Meta basics */}
        <meta
          name="description"
          content={pageData.metadataMetadescription.value}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph */}
        <meta property="og:title" content={pageData.metadataPagetitle.value} />
        <meta
          property="og:description"
          content={pageData.metadataMetadescription.value}
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={UrlPath} />
        <meta property="og:site_name" content={Globals.SITE_NAME} />
        <meta
          property="og:image"
          content={
            pageData.image.value?.[0]?.url ||
            "https://arosarealestate.com/assets/logos/ArosaLogo.png"
          }
        />
        <meta property="og:image:alt" content={pageData.name.value} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        {/* If you have updated/created dates in your model, populate these */}
        {pageData?.system?.lastModified && (
          <meta
            property="og:updated_time"
            content={new Date(pageData.system.lastModified).toISOString()}
          />
        )}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageData.metadataPagetitle.value} />
        <meta
          name="twitter:description"
          content={pageData.metadataMetadescription.value}
        />
        <meta
          name="twitter:image"
          content={
            pageData.image.value?.[0]?.url ||
            "https://arosarealestate.com/assets/logos/ArosaLogo.png"
          }
        />
        <meta name="twitter:image:alt" content={pageData.name.value} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              headline: pageData.name.value,
              description: pageData.metadataMetadescription.value,
              image: [
                pageData.image.value?.[0]?.url ||
                  "https://arosarealestate.com/assets/logos/ArosaLogo.png",
              ],
              mainEntityOfPage: UrlPath,
              datePublished:
                pageData?.elements?.date?.value ||
                pageData?.system?.lastModified,
              dateModified: pageData?.system?.lastModified,
              author: {
                "@type": "Organization",
                name: Globals.SITE_NAME,
              },
              publisher: {
                "@type": "Organization",
                name: Globals.SITE_NAME,
                logo: {
                  "@type": "ImageObject",
                  url: "https://arosarealestate.com/assets/logos/ArosaLogo.png",
                },
              },
            }),
          }}
        />
      </Head>

      <div className="news-content container mx-auto py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
          <ol className="flex items-center space-x-1">
            {crumbs.map((crumb, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <AiOutlineRight className="mx-1 h-4 w-4 text-gray-400" />
                )}
                {crumb.href !== "#" ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-primary font-medium"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-gray-700 font-semibold line-clamp-1">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="grid grid-cols-1  md:grid-cols-2 gap-10">
          <div className="relative min-h-[600px]">
            <div className="sticky top-10">
              <h1 className="text-4xl leading-tighter tracking-tighter mb-2">
                {pageData.name.value}
              </h1>
              <p className="text-md mb-5">
                {pageData.system.lastModified
                  ? new Date(pageData.system.lastModified).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }
                    )
                  : ""}
              </p>
              <Image
                src={pageData.image.value[0].url}
                alt={pageData.name.value}
                width={1200}
                height={675}
                className="rounded-2xl object-cover w-full h-auto"
              />
            </div>
          </div>

          <div
            className="prose "
            dangerouslySetInnerHTML={{ __html: pageData.content.value }}
          />
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const datasourceStr: string = await Globals.KontentClient.items()
      .type("newsitem")
      .withParameter("depth", "4")
      .toObservable()
      .toPromise()
      .then((r: any) => {
        return JSON.stringify(r.items);
      });

    const data: Array<Newsitem> = JSON.parse(datasourceStr);
    const allSlugs = data.map((item) => item.slug.value?.trim());

    // 2. remove empty or undefined slugs
    const validSlugs = allSlugs.filter((s): s is string => s.length > 0);

    // 3. dedupe in case your CMS has duplicates
    const uniqueSlugs = Array.from(new Set(validSlugs));

    // 4. build your paths
    const paths = uniqueSlugs.map((slug) => ({
      params: { slug },
    }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Error generating paths:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { slug } = params as { slug: string };

    const response = await Globals.KontentClient.items()
      .type("newsitem")
      .equalsFilter("elements.slug", slug)
      .withParameter("depth", "4")
      .toPromise();

    if (!response.items.length) {
      return { notFound: true };
    }

    return {
      props: {
        pageData: JSON.parse(JSON.stringify(response.items[0])),
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching project data:", error);
    return { notFound: true };
  }
};

export default DetailPage;
