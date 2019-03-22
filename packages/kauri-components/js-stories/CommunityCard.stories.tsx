import React from "react";
import { storiesOf } from "@storybook/react";
import CommunityCard from "../components/Card/CommunityCard";

storiesOf("CommunityCard", module)
  .add("Community Card No Image", () => (
    <CommunityCard
      cardHeight={310}
      logo={null}
      imageURL={null}
      linkComponent={null}
      name="Loom Network"
      description={`
        The Next-Generation Blockchain Application Platform for Ethereum.
        The Next-Generation Blockchain Application Platform for Ethereum.
        The Next-Generation Blockchain Application Platform for Ethereum.
        The Next-Generation Blockchain Application Platform for Ethereum.
        The Next-Generation Blockchain Application Platform for Ethereum.
      `}
      tags={[]}
      articleCount="58"
      collectionCount="58"
    />
  ))
  .add("Community Card With Image", () => (
    <CommunityCard
      cardHeight={310}
      logo="https://pbs.twimg.com/profile_images/939416633419821057/AgqO1tTQ.jpg"
      imageURL={null}
      linkComponent={null}
      name="Loom Network"
      description={`
        The Next-Generation Blockchain Application Platform for Ethereum.
        The Next-Generation Blockchain Application Platform for Ethereum.
        The Next-Generation Blockchain Application Platform for Ethereum.
        The Next-Generation Blockchain Application Platform for Ethereum.
        The Next-Generation Blockchain Application Platform for Ethereum.
      `}
      articleCount="58"
      collectionCount="58"
      tags={["loom"]}
    />
  ));
