import { createElement } from 'react';
import { Hero } from '../components/Hero';
import { WhyAttend } from '../components/whyAttend';
import { CallToActionComponent } from '../components/CallToAction';
import { PersonalizedHero } from '../components/PersonalizedHero';
import { RegisterForm } from '../components/RegistrationForm';
import { TalkList } from '../components/TalkList';

export const Components = {
  Contentstack_hero: Hero,
  Contentstack_why_attend: WhyAttend,
  Contentstack_call_to_action: CallToActionComponent,
  Contentstack_personalized_hero: PersonalizedHero,
  Contentstack_registration_form: RegisterForm,
  Contentstack_talks_list: TalkList,
};

export const componentMapper = (contentstackPage) => {
  return contentstackPage.components.map((component, i) => {
    if (component?.__typename) {
      return createElement(Components[component.__typename] ?? (() => null), {
        key: i,
        ...component,
      });
    }
  });
};
