import TagName from './TagName';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
`;

interface IProps {
    tags: string[];
    color: string;
    maxTags: number;
}

const StyledTag = styled(TagName)`
    margin-top: ${props => props.theme.space[1]}px;
    &:not(:first-child):before {
        content: '•';
        color: ${props => props.theme.colors.primary};
        margin: 0 ${props => props.theme.space[1] / 2}px;
    }
`;

const TagList = (props: IProps) => <Container>
    {props.tags.map((i, key) => {
        if (key < props.maxTags) {
        return (<StyledTag color={props.color} key={key}>{i}</StyledTag>);
    } else if (key === props.maxTags) {
        return (<StyledTag key={key} color={props.color}>+{props.tags.length - props.maxTags}</StyledTag>)
    } else {
        return null;
    }})}
</Container>

export default TagList;