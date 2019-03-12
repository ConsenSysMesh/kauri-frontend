import TagName from './TagName';
import styled from "../../lib/styled-components";
import { Tooltip } from "react-tippy";
import theme from "../../../kauri-web/lib/theme-config";

const Container = styled.div`
    display: flex;
    margin: ${theme.space[1]}px 0 0 0;
    flex-direction: row;
    flex-wrap: wrap;
`;

interface IProps {
    tags: Array<(string | null)>;
    color: string;
    maxTags: number;
    maxChars?: number;
}

export const StyledTag = styled(TagName)`
    &:not(:last-child):after {
        content: '•';
        color: ${theme.colors.primary};
        margin: ${theme.space[1]/2}px;
        font-weight: ${theme.fontWeight[3]};
    }
`;

const TooltipContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  position: relative;
  padding: ${theme.space[2]}px;
  width: 200px;
  text-align: center;
  > * {
    cursor: pointer;
  }
  > span:last-child {
    text-transform: uppercase;
    font-size: ${theme.fontSizes[0]}px;
    font-weight: ${theme.fontWeight[3]};
  }
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
  border-radius: 4px;
  margin-bottom: -10px;
  margin-left: 0px;
`;

const TooltipArrow = styled.div`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
  position: absolute;
  z-index: -1;
  bottom: -3%;
  width: 14px;
  height: 14px;
  background: white;
  transform: rotate(45deg);
  border-radius: 2px;
`;

const TagList = (props: IProps) => {
    const shownTags: string[] = [];
    const hiddenTags: string[] = [];
    props.tags.reduce((counter, item) => {
        if (item === null) {
            return counter;
        }
        if ((props.maxChars && counter + item.length <= props.maxChars) || (!props.maxChars && shownTags.length <= props.maxTags)) {
            shownTags.push(item);
            return counter + item.length;
        } else {
            hiddenTags.push(item);
            return counter;
        }
    }, 0)
    return (
        <Container>
            {shownTags.length > 0 && shownTags.map((tag, key) => <StyledTag hiddenTags={hiddenTags.length > 0} color={props.color} key={key}>{tag}</StyledTag>)}
            {hiddenTags.length > 0 && 
                <Tooltip
                    html={
                        <TooltipContainer>
                            <TooltipArrow />
                            {hiddenTags.map((tag, key) => <StyledTag color={props.color} key={key}>{tag}</StyledTag>)}
                        </TooltipContainer>
                    }
                    position="top"
                    trigger="mouseenter"
                    unmountHTMLWhenHide={true}
                >
                    <StyledTag color={props.color} key="remaining">+{hiddenTags.length}</StyledTag>
                </Tooltip>
            }
        </Container>
    );
}

export default TagList;