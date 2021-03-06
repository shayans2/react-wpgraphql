import React, { Fragment } from "react";
import { GET_HOME } from "../graphql/queries/home";
import Resource from "../containers/Resource";
import { Link } from "react-router-dom";
import _ from "lodash";
import { useTheme } from "../hooks/useTheme";

const HomePage = ({ preFetchPost }) => {
  const { theme } = useTheme();
  const themeClassName = `${
    theme === "dark" ? "text-gray-100" : "text-gray-900"
  }`;
  return (
    <Fragment>
      <Resource
        query={GET_HOME}
        options={{
          variables: {
            uri: "/about-me/", // Change this to your own aboutme page URI
            first: 3,
          },
        }}
        render={(data) => (
          <Fragment>
            <section className="mb-64 mt-40 animate__animated animate__fadeIn">
              <h1 className={`${themeClassName} font-bold text-5xl mb-4`}>
                {data.page.title}
              </h1>
              <p className={`${themeClassName} font-light text-2xl`}>
                {data.page.content.replace(/(<([^>]+)>)/gi, "")}
              </p>
            </section>
            <section className="mb-56">
              <div className="flex flex-row justify-between border-b border-gray-400 pb-3 items-center mb-10">
                <span className={`${themeClassName} text-3xl font-medium`}>
                  Latest Posts
                </span>
                <Link to="/blog" className="text-gray-600">
                  Read all posts
                </Link>
              </div>

              {data.posts.edges.map((post) => (
                <div
                  className="mb-10"
                  key={post.node.id}
                  onMouseEnter={_.once(() =>
                    preFetchPost(post.node.uri.replace(/\//g, ""))
                  )}
                >
                  <Link
                    to={`/posts${post.node.uri}`}
                    className={`${themeClassName} text-2xl font-light hover:underline`}
                  >
                    {post.node.title}
                  </Link>
                  <p className="text-xl font-light text-gray-600 pt-2">
                    {new Date(post.node.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </section>
          </Fragment>
        )}
      />

      <section>
        <div className="border-b border-gray-400 pb-3 mb-10">
          <span className={`${themeClassName} text-3xl font-medium`}>
            Projects
          </span>
        </div>
        <div className="mb-4">
          <a
            className={`${themeClassName} text-2xl font-light`}
            href="https://github.com/shayans2/Instagram-Clone"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram Clone
          </a>
        </div>
        <div className="mb-4">
          <a
            className={`${themeClassName} text-2xl font-light`}
            href="https://github.com/shayans2/React-WPGraphQL"
            target="_blank"
            rel="noopener noreferrer"
          >
            React - WPGraphQL
          </a>
        </div>
      </section>
    </Fragment>
  );
};

export default HomePage;
