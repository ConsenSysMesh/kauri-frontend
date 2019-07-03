import React from "react";
import { IShowNotificationPayload } from "../../../../lib/Module";
import AlertView from "../../../../../kauri-components/components/Modal/AlertView";
import PublishingSelector, {
  IOption,
} from "../../../common/PublishingSelector";
import analytics from "../../../../lib/analytics";
import { Form, Field, FieldProps, InjectedFormikProps } from "formik";
import {
  IDraftArticleActionPayload,
  selectDestinationAction as selectDestination,
} from "../Module";
import Loading from "../../../common/Loading";
import { getArticle } from "../../../../queries/__generated__/getArticle";
import { submitArticleVersionVariables } from "../../../../queries/__generated__/submitArticleVersion";
import { editArticleVersionVariables } from "../../../../queries/__generated__/editArticleVersion";
import { submitArticleVariables } from "../../../../queries/__generated__/submitArticle";
import { publishArticleVariables } from "../__generated__/publishArticle";
import { IFormValues, prefixTestId } from "./";
import Input from "../../../../../kauri-components/components/Input/Input";
import PrimaryButtonComponent from "../../../../../kauri-components/components/Button/PrimaryButton";
import R from "ramda";
import ProposeUpdateModal from "../ProposeUpdateModal";
import SecondaryButtonComponent from "../../../../../kauri-components/components/Button/SecondaryButton";
import TagSelector from "../../../common/TagSelector";
import SubmitArticleFormContent from "../SubmitArticleFormContent";
import TertiaryButtonComponent from "../../../../../kauri-components/components/Button/TertiaryButton";
import TriggerImageUploader from "../../../common/ImageUploader";

const UploadIcon: React.FunctionComponent = () => (
  <img src="https://png.icons8.com/color/50/000000/upload.png" />
);

export interface IProps {
  router: any;
  draftArticleAction: (payload: IDraftArticleActionPayload) => void;
  submitArticleAction: (payload: submitArticleVariables) => void;
  submitArticleVersionAction: (
    payload: submitArticleVersionVariables,
    callback: any
  ) => void;
  editArticleAction: (
    payload: editArticleVersionVariables,
    callback: any
  ) => void;
  publishArticleAction: (payload: publishArticleVariables) => void;
  selectDestinationAction: typeof selectDestination;
  id?: string;
  data?: getArticle;
  handleFormChange: any;
  routeChangeAction: any;
  showNotificationAction: (payload: IShowNotificationPayload) => void;
  username: string;
  userId: string;
  userAvatar: string;
  openModalAction: (children?: any) => void;
  closeModalAction: () => void;
  communities: Array<{ community: IOption }>;
  onSubmit?: any; // NODE_ENV === 'test'
}

const isOwner = (
  ownerId: string,
  userId: string,
  communities: string[] | null
) =>
  (Array.isArray(communities) && communities.includes(ownerId)) ||
  ownerId === userId;

class SubmitArticleFormComponent extends React.Component<
  InjectedFormikProps<IProps, IFormValues>
> {
  componentDidMount() {
    const {
      userId,
      router,
      routeChangeAction,
      communities,
      openModalAction,
      closeModalAction,
    } = this.props;

    if (!userId) {
      routeChangeAction(`/login?r=${router.asPath}&redirected=true`);
    } else {
      analytics.track("Write Article Start", {
        category: "generic",
      });
      if (
        communities &&
        communities.length > 0 &&
        !window.localStorage.getItem("community-publishing-modal")
      ) {
        openModalAction({
          children: (
            <AlertView
              title="Publish to Community"
              content={
                <div>
                  You can publish articles to your personal and also communities
                  when selecting Publish
                </div>
              }
              confirmButtonAction={() => {
                window.localStorage.setItem(
                  "community-publishing-modal",
                  Date.now().toString()
                );
                closeModalAction();
              }}
              closeModalAction={() => {
                window.localStorage.setItem(
                  "community-publishing-modal",
                  Date.now().toString()
                );
                closeModalAction();
              }}
              closeButtonText="Understood"
              confirmButtonText="Learn More"
            />
          ),
        });
      }
    }
    analytics.track("Write Article Start", {
      category: "generic",
    });
  }

  selectDestination() {
    throw new Error("Method not implemented.");
  }

  render() {
    const {
      userId,
      communities,
      openModalAction,
      closeModalAction,
      showNotificationAction,
    } = this.props;

    if (!userId) {
      return <Loading />;
    }

    const ownerId = R.path(["data", "getArticle", "owner", "id"])(
      this.props
    ) as any;
    const ownsArticle = isOwner(ownerId, userId, communities as any);

    return (
      <Form data-testid={prefixTestId("form")}>
        <Field
          type="text"
          name="title"
          render={({ field }: FieldProps<IFormValues>) => (
            <Input
              {...field}
              data-testid={prefixTestId("title")}
              fontSize={7}
              fontWeight={500}
              placeHolder={"Add Article Title"}
            />
          )}
        />
        <Field
          name="tags"
          render={({ field }: FieldProps<IFormValues>) => {
            return (
              <TagSelector
                prefixTestId={prefixTestId}
                tags={field.value}
                updateTags={(tags: string[]) =>
                  this.props.setFieldValue("tags", tags)
                }
              />
            );
          }}
        />
        <Field
          name="content"
          render={({ field }: FieldProps<IFormValues>) => {
            return (
              <SubmitArticleFormContent
                getFieldError={() => {}}
                text={field.value}
                getFieldsValue={() => {}}
                setFieldsValue={({ text }) =>
                  this.props.setFieldValue("text", text)
                }
                getFieldDecorator={test => {
                  return children => children;
                }}
                id={R.path<string>(["data", "getArticle", "id"])(this.props)}
                text={field.value}
              />
            );
          }}
        />
        <TertiaryButtonComponent
          data-testid={prefixTestId("upload-background")}
          icon={<UploadIcon />}
          handleClick={() =>
            TriggerImageUploader(
              ({ attributes: { background } }) =>
                this.props.setFieldValue("attributes.background", background),
              "attributes"
            )
          }
        >
          Upload Background
        </TertiaryButtonComponent>
        <SecondaryButtonComponent
          data-testid={prefixTestId("draft")}
          onClick={() => {
            this.props.draftArticleAction();
          }}
        >
          Save Draft
        </SecondaryButtonComponent>
        {!ownerId && (
          <PrimaryButtonComponent
            type="button"
            disabled={this.props.isSubmitting}
            data-testid={prefixTestId("publish")}
            onClick={() => {
              this.props.selectDestinationAction();
            }}
          >
            Publish Article
          </PrimaryButtonComponent>
        )}
        {ownsArticle && (
          <PrimaryButtonComponent
            disabled={this.props.isSubmitting}
            data-testid={prefixTestId("update")}
            onClick={() => {
              this.props.editArticleAction();
            }}
          >
            Update Article
          </PrimaryButtonComponent>
        )}
        {ownerId && !ownsArticle && (
          <PrimaryButtonComponent
            disabled={this.props.isSubmitting}
            data-testid={prefixTestId("propose")}
            onClick={() =>
              openModalAction({
                children: (
                  <ProposeUpdateModal
                    closeModalAction={() => closeModalAction()}
                    confirmModal={updateComment =>
                      this.props.publishArticleAction({
                        updateComment,
                      })
                    }
                    showNotificationAction={showNotificationAction}
                  />
                ),
              })
            }
          >
            Propose Update
          </PrimaryButtonComponent>
        )}
      </Form>
    );
  }
}

export default SubmitArticleFormComponent;