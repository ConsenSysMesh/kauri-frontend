import PublicProfileEmptyState from "../PublicProfileEmptyState";
import PrimaryButtonComponent from "../Button/PrimaryButton";

const ManageMemberEmptyState: React.SFC<{
  handleClick: () => void;
}> = ({ handleClick }) => (
  <PublicProfileEmptyState
    iconSrc=""
    description={
      "Moderators can add articles and collections to the community, as well as edit and remove existing ones."
    }
    learnMoreLinkComponent={childrenProps => childrenProps}
    title="Moderators"
    primaryButton={
      <PrimaryButtonComponent onClick={handleClick}>
        Add Moderator
      </PrimaryButtonComponent>
    }
  />
);

export default ManageMemberEmptyState;