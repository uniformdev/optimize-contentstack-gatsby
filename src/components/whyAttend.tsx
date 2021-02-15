import React from 'react';
import { graphql } from 'gatsby';

export const WhyAttend: React.FC<any> = ({ title, description, image }) => {
  return (
    <section className="bg-white border-b py-8">
      <div className="container mx-auto lg:flex lg:flex-wrap pt-4 pb-12">
        <div className="lg:w-1/2">
          {image ? (
            <img
              src={image.url}
              height={image.dimension?.height ?? 400}
              width={image.dimension?.width ?? 400}
              alt={image.title ?? title}
              loading="lazy"
              className="p-10 lg:my-auto"
            />
          ) : null}
        </div>
        <div className="lg:w-1/2">
          <div className="p-10 lg:my-auto">
            <h2 className="w-full my-2 text-4xl font-bold leading-tight text-center text-gray-800">
              {title}
            </h2>
            <hr />
            <p
              className="text-gray-800 p-10 whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export const query = graphql`
  fragment whyAttend on Contentstack_why_attend {
    image {
      url
      dimension {
        height
        width
      }
      title
    }
    title
    description
  }
`;
