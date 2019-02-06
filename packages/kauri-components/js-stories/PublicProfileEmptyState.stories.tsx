import React from "react";
import { storiesOf } from "@storybook/react";
import styled from "../lib/styled-components";
import PrimaryButtonComponent from "../components/Button/PrimaryButton";
import MediumImportButton from "../components/Button/MediumImportButton";
import PublicProfileEmptyState from "../components/PublicProfileEmptyState";

const DecoratorContainer = styled.div`
  display: flex;
  width: 500px;
  margin: 0 auto;
`;

storiesOf("PublicProfile Empty States", module)
  .addDecorator(story => <DecoratorContainer>{story()}</DecoratorContainer>)
  .add("No Articles Published", () => (
    <PublicProfileEmptyState
      iconSrc={"/static/images/icons/no-published-articles.svg"}
      description={`Any articles you've published on Kauri will appear here. 
          Get started by creating a new draft below, or importing one you've written on Medium!
          Your draft articles will be shown in the next tab until you publish them.
      `}
      learnMoreLinkComponent={childrenProps => childrenProps}
      title="No Articles Published"
      secondaryButton={<MediumImportButton border={true} />}
      primaryButton={
        <PrimaryButtonComponent>Create Article</PrimaryButtonComponent>
      }
    />
  ))
  .add("No Saved Drafts", () => (
    <PublicProfileEmptyState
      iconSrc={"/static/images/icons/no-saved-drafts.svg"}
      description={
        "All of your draft articles will appear here. Create one now!"
      }
      learnMoreLinkComponent={childrenProps => childrenProps}
      title="No Saved Drafts"
      primaryButton={
        <PrimaryButtonComponent>Create Article</PrimaryButtonComponent>
      }
    />
  ))
  .add("No Collections Created", () => (
    <PublicProfileEmptyState
      iconSrc={"/static/images/icons/no-collections-created.svg"}
      description={`Collections are ways to group and organize articles on Kauri.
           Common collections are tutorial series, articles about a single product, multiple projects, or even just a user's favourite articles.`}
      learnMoreLinkComponent={childrenProps => childrenProps}
      title="No Collections Created"
      primaryButton={
        <PrimaryButtonComponent>Create Collection</PrimaryButtonComponent>
      }
    />
  ))
  .add("No Collections Created - Others", () => (
    <PublicProfileEmptyState
      iconSrc={"/static/images/icons/no-collections-created.svg"}
      description={`Collections are ways to group and organize articles on Kauri.
           Common collections are tutorial series, articles about a single product, multiple projects, or even just a user's favourite articles.`}
      learnMoreLinkComponent={childrenProps => childrenProps}
      title="No Collections Created"
    />
  ))
  .add("No Articles Published - Others", () => (
    <PublicProfileEmptyState
      iconSrc={"/static/images/icons/no-published-articles.svg"}
      description={
        "The user hasn't published any articles yet. Once they do, they will appear here!"
      }
      learnMoreLinkComponent={childrenProps => childrenProps}
      title="No Articles Published"
    />
  ))
  .add("No Submitted Updates", () => (
    <PublicProfileEmptyState
      iconSrc={"/static/images/icons/no-submitted-updates.svg"}
      description={`If you think of an improvement to another user's article, you can suggest edits by clicking "Update Article".
          They'll then be asked to approve or reject (giving a reason) your edits.
          Your pending submitted edits will appear here.`}
      learnMoreLinkComponent={childrenProps => childrenProps}
      title="No Submitted Updates"
      primaryButton={
        <PrimaryButtonComponent>Create Collection</PrimaryButtonComponent>
      }
    />
  ))
  .add("No Articles For Approval", () => (
    <PublicProfileEmptyState
      iconSrc={"/static/images/icons/no-articles-for-approval.svg"}
      description={`If another user on Kauri suggests edits to one of your published articles, you'll be asked to approve or reject them.
        These pending edits will appear here until you do so.`}
      learnMoreLinkComponent={childrenProps => childrenProps}
      title="No Articles For Approval"
    />
  ));
