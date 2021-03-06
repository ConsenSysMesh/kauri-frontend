import * as React from "react";
import ActionsSection, {
  MiddleActionsStack,
  RightActionsRow,
} from "../../../../kauri-components/components/Section/ActionsSection";
import PrimaryButtonComponent from "../../../../kauri-components/components/Button/PrimaryButton";
import TertiaryButtonComponent from "../../../../kauri-components/components/Button/TertiaryButton";
import GreenArrow from "../../common/GreenArrow";
import UploadIcon from "../../../../kauri-components/components/Icon/UploadIcon";
import showFormValidationErrors from "../../../lib/show-form-validation-errors";
import { showNotificationAction as showNotification } from "../../../lib/Module";

interface IProps {
  id: string | null;
  goBack: () => void;
  setupImageUploader: () => void;
  isSubmitting: boolean;
  background: null | string;
  validateForm: () => Promise<any>;
  showNotificationAction: typeof showNotification;
}

const Component: React.FunctionComponent<IProps> = props => (
  <ActionsSection
    bg={(typeof props.background === "string" && "transparent") || "bgPrimary"}
  >
    <TertiaryButtonComponent
      icon={<GreenArrow direction={"left"} />}
      onClick={() => props.goBack()}
    >
      <span>Go Back</span>
    </TertiaryButtonComponent>

    <MiddleActionsStack>
      <TertiaryButtonComponent
        icon={<UploadIcon />}
        handleClick={() => props.setupImageUploader()}
      >
        Background Image
      </TertiaryButtonComponent>
    </MiddleActionsStack>

    <RightActionsRow>
      <PrimaryButtonComponent
        type="submit"
        disabled={props.isSubmitting}
        onClick={() =>
          showFormValidationErrors(
            props.validateForm,
            props.showNotificationAction,
            () => {
              return;
            }
          )
        }
      >
        {`${props.id ? "Update" : "Create"} Community`}
      </PrimaryButtonComponent>
    </RightActionsRow>
  </ActionsSection>
);

export default Component;
