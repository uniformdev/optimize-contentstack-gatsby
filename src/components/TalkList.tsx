import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { TalkListItem } from './TalkListItem';
import { useAllTalks } from '../hooks/get-talks';
import { Personalize } from '@uniformdev/optimize-tracker-react';
import { contentstackOptimizeListReader } from '@uniformdev/optimize-tracker-contentstack';

export const TalkList: React.FC<any> = ({
  register_button_text,
  number_to_show,
  title,
  title_when_personalized,
}) => {
  const {
    allContentstackTalk: { edges: talks },
  } = useAllTalks();

  // We need to massage the graphql query result data into the format expected
  // by the `contentstackOptimizeListReader`.
  const talksList = talks.map((talk) => {
    return {
      ...talk.node,
      _content_type_uid: talk.node.internal.type,
    };
  });

  const personalizableTalks = contentstackOptimizeListReader(talksList);

  return (
    <section className="bg-white border-b py-8">
      <div className="container mx-auto flex flex-wrap pt-4 pb-12">
        {talks && (
          <Personalize
            name="Personalized Talk List"
            variations={personalizableTalks}
            component={TalkListItem}
            count={number_to_show}
            buttonText={register_button_text}
            trackingEventName="talkListPersonalized"
          >
            {({ personalized, components }) => (
              <>
                <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
                  {personalized ? title_when_personalized : title}
                </h2>
                <div className="w-full mb-4">
                  <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t" />
                </div>
                {components}
              </>
            )}
          </Personalize>
        )}
      </div>
    </section>
  );
};

export const query = graphql`
  fragment talkList on Contentstack_talks_list {
    title
    title_when_personalized
    number_to_show
    register_button_text
  }
`;
