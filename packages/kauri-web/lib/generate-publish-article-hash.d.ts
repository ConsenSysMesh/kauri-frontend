// @flow

const convertIpfsHash = (ipfsHash: string) => string;

const generatePublishArticleHash = (
  id: string,
  version: number,
  contentHash: string,
  contributor: string,
  dateCreated: string,
  updateComment?: string
) => string;

export default generatePublishArticleHash;
export { convertIpfsHash };
