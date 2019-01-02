import React from "react";
import { storiesOf } from "@storybook/react";
import QuickSearch from "../components/Search/QuickSearch";
import QuickSearchInput from "../components/Search/QuickSearchInput";

storiesOf("Search", module)
.add('QuickSearchInput', () => (
  <QuickSearchInput />
))
.add("Quick Search", () => (
  <QuickSearch results={[
    {
      "description":  "This is a community description",
      "id": "123213123",
      "name": "<span class='highlighter'>Remix</span> IDE - Your first smart contract",
      "score": 10,
      "tags": ["remix", "ethereum"],
      "type": "COMMUNITY",
    },
    {
      "description":  "This is a community description",
      "id": "123213123",
      "name": "<span class='highlighter'>Remix</span> IDE - Your first smart contract",
      "score": 10,
      "tags": ["remix", "ethereum"],
      "type": "COMMUNITY",
    },
    {
      "description":  "This is a community description",
      "id": "123213123",
      "name": "<span class='highlighter'>Remix</span> IDE - Your first smart contract",
      "score": 10,
      "tags": ["remix", "ethereum"],
      "type": "COMMUNITY",
    },
    {
      "description":  "This is a community description",
      "id": "123213123",
      "name": "<span class='highlighter'>Remix</span> IDE - Your first smart contract",
      "score": 10,
      "tags": ["remix", "ethereum"],
      "type": "COMMUNITY",
    },
    {
      "description":  "This is a community description with a random <span class='highlighter'>Remix</span> tag on it",
      "id": "123213123",
      "name": "<span class='highlighter'>Remix</span> IDE - Your first smart contract",
      "score": 10,
      "tags": ["remix", "ethereum"],
      "type": "COMMUNITY",
    },
    {
      "description":  "This is a collection description",
      "id": "123213123",
      "name": "<span class='highlighter'>Remix</span> IDE - Your first smart contract",
      "score": 10,
      "tags": ["remix", "ethereum"],
      "type": "COLLECTION",
    },
    {
      "description":  "This is a collection description",
      "id": "123213123",
      "name": "<span class='highlighter'>Remix</span> IDE - Your first smart contract",
      "score": 10,
      "tags": ["remix", "ethereum"],
      "type": "COLLECTION",
    },
    {
      "description":  "This is a collection description",
      "id": "123213123",
      "name": "<span class='highlighter'>Remix</span> IDE - Your first smart contract",
      "score": 10,
      "tags": ["remix", "ethereum"],
      "type": "COLLECTION",
    },
    {
      "description":  "This is a collection description",
      "id": "123213123",
      "name": "<span class='highlighter'>Remix</span> IDE - Your first smart contract",
      "score": 10,
      "tags": ["remix", "ethereum"],
      "type": "COLLECTION",
    },
    {
      "description":  "This is a collection description",
      "id": "123213123",
      "name": "<span class='highlighter'>Remix</span> IDE - Your first smart contract",
      "score": 10,
      "tags": ["remix", "ethereum"],
      "type": "COLLECTION",
    },
    {
      "description":  "Does a user even have a description?",
      "id": "123213123",
      "name": "<span class='highlighter'>Remix</span> IDE - Your first smart contract",
      "score": 10,
      "tags": null,
      "type": "USER",
    },
    {
      "description":  "Does a user even have a description?",
      "id": "123213123",
      "name": "<span class='highlighter'>Remix</span> IDE - Your first smart contract",
      "score": 10,
      "tags": null,
      "type": "USER",
    },
    {
      "description":  "Does a user even have a description?",
      "id": "123213123",
      "name": "<span class='highlighter'>Remix</span> IDE - Your first smart contract",
      "score": 10,
      "tags": null,
      "type": "USER",
    },
    {
      "description":  "Does a user even have a description?",
      "id": "123213123",
      "name": "<span class='highlighter'>Remix</span> IDE - Your first smart contract",
      "score": 10,
      "tags": null,
      "type": "USER",
    },
    {
      "description":  "\\n\\nNow let's create a Bounties.sol file in the contracts folder and copy the contents of [Bounties.sol] (https://github.com/kauri-io/kauri-fullstack-dapp-tutorial-series/blob/master/<span class='highlighter'>remix</span>-bounties-smartcontract/Bounties-complete.sol) which we previously developed.\\n\\n!",
      "id": "123213123",
      "name": "<span class='highlighter'>Remix</span> IDE - Your first smart contract",
      "score": 10,
      "tags": ["remix", "ethereum"],
      "type": "ARTICLE",
    },
    {
      "description":  "\\n\\nNow let's create a Bounties.sol file in the contracts folder and copy the contents of [Bounties.sol] (https://github.com/kauri-io/kauri-fullstack-dapp-tutorial-series/blob/master/<span class='highlighter'>remix</span>-bounties-smartcontract/Bounties-complete.sol) which we previously developed.\\n\\n!",
      "id": "123213123",
      "name": "<span class='highlighter'>Remix</span> IDE - Your first smart contract",
      "score": 10,
      "tags": ["remix", "ethereum"],
      "type": "ARTICLE",
    },
  ]} />
));
