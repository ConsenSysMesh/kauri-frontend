// @flow
import React, {Component} from 'react';
import Tabs from '../../../../kauri-components/components/Tabs';
import Articles from './Articles';
import Collections from './Collections';
import Header from './Header';
import EditableHeader from './EditableHeader';
import Loading from '../../common/Loading';

import type { ViewProps, ViewState } from './types';

class PublicProfile extends Component<ViewProps, ViewState> {
  constructor (props: ViewProps) {
    super(props);
    if (props.UserQuery.getUser) {
      this.state = {
        ...props.UserQuery.getUser,
        ...props.UserQuery.getUser.social,
        isEditing: false,
      }
    } else {
      this.state = {
        isEditing: false,
        avatar: '',
        username: '',
        name: '',
        title: '',
        website: '',
        twitter: '',
        github: '',
      }
    }
  }

  toggleEditing () {
    this.setState({ isEditing: !this.state.isEditing });
  }

  render () {
    const { PendingQuery, UserQuery, ArticlesQuery, CollectionQuery, DraftsQuery, ApprovalsQuery, routeChangeAction, currentUser } = this.props;

    const isHeaderLoaded =
      typeof UserQuery.getUser === "object" &&
      typeof ArticlesQuery.searchArticles === "object" && 
      typeof CollectionQuery.searchCollections === "object";

    const areListsLoaded =
      typeof DraftsQuery.searchArticles === "object" &&
      typeof PendingQuery.searchArticles === "object" &&
      typeof ApprovalsQuery.searchArticles === "object";

      console.log(this.props);
    
    return (
      <div>
        {this.state.isEditing && isHeaderLoaded && <EditableHeader
          {...this.state}
          toggleEditing={() => this.toggleEditing()}
          saveUserAction={this.props.saveUserDetailsAction}
          />}
        
        {!this.state.isEditing && isHeaderLoaded ? <Header
              articles={ArticlesQuery.searchArticles.content}
              collections={CollectionQuery.searchCollections.content}
              currentUser={currentUser}
              id={UserQuery.getUser.id}
              avatar={this.state.avatar || UserQuery.getUser.avatar}
              username={this.state.username || UserQuery.getUser.username}
              name={this.state.name || UserQuery.getUser.name}
              title={this.state.title || UserQuery.getUser.title}
              website={this.state.website || UserQuery.getUser.website}
              twitter={this.state.twitter || (UserQuery.getUser.social && UserQuery.getUser.social.twitter)}
              github={this.state.github || (UserQuery.getUser.social && UserQuery.getUser.social.github)}
              toggleEditing={() => this.toggleEditing()}
            /> : <Loading />
        }
        {isHeaderLoaded && areListsLoaded ? <Tabs
          tabs={[
            `Articles (${ArticlesQuery.searchArticles.content.length})`,
            UserQuery.getUser.id === currentUser && `My Drafts (${DraftsQuery.searchArticles.content.length})`,
            `Collections (${CollectionQuery.searchCollections.content.length})`,
            `Awaiting Owner Approval (${ApprovalsQuery.searchArticles.content.length})`,
            `Pending My Approval(${PendingQuery.searchArticles.content.length})`,
          ]}
          panels={[
            <Articles articles={ArticlesQuery.searchArticles} routeChangeAction={routeChangeAction} />,
            UserQuery.getUser.id === currentUser && <Articles articles={DraftsQuery.searchArticles} routeChangeAction={routeChangeAction} />,
            <Collections collections={CollectionQuery.searchCollections} routeChangeAction={routeChangeAction} />,
            <Articles articles={ApprovalsQuery.searchArticles} routeChangeAction={routeChangeAction} />,
            <Articles type="toBeApproved" articles={PendingQuery.searchArticles} routeChangeAction={routeChangeAction} />,
          ]}
        /> : !isHeaderLoaded ? null : <Loading />}
      </div>
    );
  }
};

export default PublicProfile;
